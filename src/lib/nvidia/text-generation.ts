const DEFAULT_NVIDIA_TEXT_API_BASE_URL = 'https://integrate.api.nvidia.com';

export const DEFAULT_NVIDIA_TEXT_MODEL = 'meta/llama-3.1-8b-instruct';

type FetchLike = typeof fetch;

export type GenerateNvidiaCocktailCopyInput = {
  apiKey: string;
  ingredientList: string;
  garnishList: string;
  glassware: string;
  imagePrompt?: string;
  model?: string;
  apiBaseUrl?: string;
  endpoint?: string;
  fetchImpl?: FetchLike;
};

export type GenerateNvidiaCocktailCopyResult = {
  name: string;
  description: string;
  model: string;
  provider: 'nvidia-chat-completions';
};

type NvidiaChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  detail?: Array<{
    loc?: Array<string | number>;
    msg?: string;
  }>;
  error?: string | { message?: string };
  message?: string;
};

export class NvidiaTextGenerationError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'NvidiaTextGenerationError';
  }
}

function getNvidiaErrorMessage(payload: NvidiaChatResponse, fallback: string) {
  if (typeof payload.error === 'string') return payload.error;
  if (payload.error?.message) return payload.error.message;
  if (Array.isArray(payload.detail) && payload.detail.length > 0) {
    const detailMessage = payload.detail
      .map((item) => {
        const location = Array.isArray(item.loc) ? item.loc.join('.') : '';
        if (location && item.msg) return `${location}: ${item.msg}`;
        return item.msg || '';
      })
      .filter(Boolean)
      .join('; ');

    if (detailMessage) return detailMessage;
  }
  return payload.message || fallback;
}

function buildNvidiaChatEndpoint(apiBaseUrl: string) {
  const baseUrl = apiBaseUrl.replace(/\/+$/, '');
  return `${baseUrl}/v1/chat/completions`;
}

function parseCopyFromContent(content: string) {
  const trimmed = content.trim();

  const directJson = tryParseJson(trimmed);
  if (directJson) return directJson;

  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    const candidate = trimmed.slice(firstBrace, lastBrace + 1);
    const nestedJson = tryParseJson(candidate);
    if (nestedJson) return nestedJson;
  }

  return null;
}

function tryParseJson(raw: string) {
  try {
    const parsed = JSON.parse(raw) as { name?: unknown; description?: unknown };
    const name = typeof parsed.name === 'string' ? parsed.name.trim() : '';
    const description = typeof parsed.description === 'string' ? parsed.description.trim() : '';
    if (!name || !description) return null;
    return { name, description };
  } catch {
    return null;
  }
}

export async function generateNvidiaCocktailCopy({
  apiKey,
  ingredientList,
  garnishList,
  glassware,
  imagePrompt,
  model = DEFAULT_NVIDIA_TEXT_MODEL,
  apiBaseUrl = DEFAULT_NVIDIA_TEXT_API_BASE_URL,
  endpoint,
  fetchImpl = fetch,
}: GenerateNvidiaCocktailCopyInput): Promise<GenerateNvidiaCocktailCopyResult> {
  const chatEndpoint = endpoint || buildNvidiaChatEndpoint(apiBaseUrl);

  const systemPrompt =
    'You are a professional cocktail copywriter. Return strict JSON only: {"name":"...","description":"..."}.' +
    ' Use Simplified Chinese for both fields. Name must be 2-12 Chinese characters. Description must be 35-80 Chinese characters and focus on aroma, taste, and mouthfeel. No markdown.';
  const userPrompt =
    `Ingredients: ${ingredientList}\n` +
    `Garnish: ${garnishList}\n` +
    `Glassware: ${glassware}\n` +
    (imagePrompt ? `Image style prompt: ${imagePrompt}\n` : '') +
    'Create one premium cocktail name and one tasting description.';

  const response = await fetchImpl(chatEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 220,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  let payload: NvidiaChatResponse;
  try {
    payload = (await response.json()) as NvidiaChatResponse;
  } catch {
    payload = {};
  }

  if (!response.ok) {
    throw new NvidiaTextGenerationError(
      getNvidiaErrorMessage(payload, `NVIDIA text request failed: ${response.status}`),
      response.status,
    );
  }

  const content = payload.choices?.[0]?.message?.content?.trim() || '';

  if (!content) {
    throw new NvidiaTextGenerationError('NVIDIA text response did not include message content.');
  }

  const parsedCopy = parseCopyFromContent(content);

  if (!parsedCopy) {
    throw new NvidiaTextGenerationError('NVIDIA text response did not return valid JSON copy.');
  }

  return {
    name: parsedCopy.name,
    description: parsedCopy.description,
    model,
    provider: 'nvidia-chat-completions',
  };
}
