const DEFAULT_NVIDIA_API_BASE_URL = 'https://ai.api.nvidia.com';

export const DEFAULT_NVIDIA_IMAGE_MODEL = 'black-forest-labs/flux.2-klein-4b';

type FetchLike = typeof fetch;

export type GenerateNvidiaImageInput = {
  apiKey: string;
  prompt: string;
  model?: string;
  apiBaseUrl?: string;
  endpoint?: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  cfgScale?: number;
  samples?: number;
  seed?: number;
  steps?: number;
  fetchImpl?: FetchLike;
};

export type GenerateNvidiaImageResult = {
  imageData: string;
  imageUrl?: string;
  model: string;
  provider: 'nvidia-flux-2-klein';
};

type NvidiaImageItem = {
  base64?: string;
  b64_json?: string;
  url?: string;
};

type NvidiaImageResponse = {
  artifacts?: NvidiaImageItem[];
  data?: NvidiaImageItem[];
  images?: NvidiaImageItem[];
  detail?: Array<{
    loc?: Array<string | number>;
    msg?: string;
  }>;
  error?: string | { message?: string };
  message?: string;
};

export class NvidiaImageGenerationError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'NvidiaImageGenerationError';
  }
}

function normalizeNvidiaModel(model?: string) {
  const selectedModel = model?.trim() || DEFAULT_NVIDIA_IMAGE_MODEL;

  if (selectedModel.includes('/')) {
    return selectedModel;
  }

  return `black-forest-labs/${selectedModel}`;
}

function buildNvidiaImageEndpoint(apiBaseUrl: string, model: string) {
  const baseUrl = apiBaseUrl.replace(/\/+$/, '');
  return `${baseUrl}/v1/genai/${model}`;
}

function getNvidiaErrorMessage(payload: NvidiaImageResponse, fallback: string) {
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

function arrayBufferToBase64(buffer: ArrayBuffer) {
  return Buffer.from(buffer).toString('base64');
}

async function downloadImageAsDataUrl(imageUrl: string, fetchImpl: FetchLike) {
  const imageResponse = await fetchImpl(imageUrl);

  if (!imageResponse.ok) {
    throw new Error(`Failed to download generated image: ${imageResponse.status}`);
  }

  const mimeType = imageResponse.headers.get('content-type') || 'image/png';
  const imageBuffer = await imageResponse.arrayBuffer();
  return `data:${mimeType};base64,${arrayBufferToBase64(imageBuffer)}`;
}

function getImageFromPayload(payload: NvidiaImageResponse) {
  return payload.artifacts?.[0] || payload.data?.[0] || payload.images?.[0];
}

export async function generateNvidiaImage({
  apiKey,
  prompt,
  model,
  apiBaseUrl = DEFAULT_NVIDIA_API_BASE_URL,
  endpoint,
  negativePrompt,
  width = 1024,
  height = 1024,
  cfgScale,
  samples = 1,
  seed = 0,
  steps = 4,
  fetchImpl = fetch,
}: GenerateNvidiaImageInput): Promise<GenerateNvidiaImageResult> {
  const selectedModel = normalizeNvidiaModel(model);
  const imageEndpoint = endpoint || buildNvidiaImageEndpoint(apiBaseUrl, selectedModel);
  const requestBody: Record<string, unknown> = {
    prompt,
    width,
    height,
    samples,
    seed,
    steps,
  };

  if (negativePrompt) {
    requestBody.negative_prompt = negativePrompt;
  }

  if (typeof cfgScale === 'number') {
    requestBody.cfg_scale = cfgScale;
  }

  const response = await fetchImpl(imageEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  let payload: NvidiaImageResponse;
  try {
    payload = (await response.json()) as NvidiaImageResponse;
  } catch {
    payload = {};
  }

  if (!response.ok) {
    const fallbackMessage = response.status === 404
      ? 'NVIDIA image request returned 404. Check NVIDIA_API_BASE_URL or NVIDIA_IMAGE_ENDPOINT; the official base URL is https://ai.api.nvidia.com.'
      : `NVIDIA image request failed: ${response.status}`;

    throw new NvidiaImageGenerationError(
      getNvidiaErrorMessage(payload, fallbackMessage),
      response.status,
    );
  }

  const image = getImageFromPayload(payload);

  if (!image) {
    throw new Error('NVIDIA response did not include an image.');
  }

  const imageBase64 = image.base64 || image.b64_json;

  if (imageBase64) {
    return {
      imageData: `data:image/png;base64,${imageBase64}`,
      model: selectedModel,
      provider: 'nvidia-flux-2-klein',
    };
  }

  if (!image.url) {
    throw new Error('NVIDIA image response did not include a URL or base64 payload.');
  }

  const imageData = await downloadImageAsDataUrl(image.url, fetchImpl);

  return {
    imageData,
    imageUrl: image.url,
    model: selectedModel,
    provider: 'nvidia-flux-2-klein',
  };
}


