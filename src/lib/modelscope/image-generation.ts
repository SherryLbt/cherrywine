const MODELSCOPE_API_BASE_URL = 'https://api-inference.modelscope.cn/v1';
const MODELSCOPE_IMAGE_ENDPOINT = `${MODELSCOPE_API_BASE_URL}/images/generations`;

type FetchLike = typeof fetch;

export type GenerateModelScopeImageInput = {
  apiKey: string;
  prompt: string;
  model: string;
  negativePrompt?: string;
  size?: string;
  fetchImpl?: FetchLike;
};

export type GenerateModelScopeImageResult = {
  imageData: string;
  imageUrl: string;
  model: string;
  provider: 'modelscope-api-inference';
};

type ModelScopeImageItem = {
  url?: string;
  b64_json?: string;
};

type ModelScopeImageResponse = {
  images?: ModelScopeImageItem[];
  data?: ModelScopeImageItem[];
  error?: string | { message?: string };
  message?: string;
};

function getModelScopeErrorMessage(payload: ModelScopeImageResponse, fallback: string) {
  if (typeof payload.error === 'string') return payload.error;
  if (payload.error?.message) return payload.error.message;
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

export async function generateModelScopeImage({
  apiKey,
  prompt,
  model,
  negativePrompt,
  size = '1024x1024',
  fetchImpl = fetch,
}: GenerateModelScopeImageInput): Promise<GenerateModelScopeImageResult> {
  const response = await fetchImpl(MODELSCOPE_IMAGE_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt,
      negative_prompt: negativePrompt || undefined,
      n: 1,
      size,
    }),
  });

  let payload: ModelScopeImageResponse;
  try {
    payload = (await response.json()) as ModelScopeImageResponse;
  } catch {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(getModelScopeErrorMessage(payload, `ModelScope request failed: ${response.status}`));
  }

  const image = payload.images?.[0] || payload.data?.[0];

  if (!image) {
    throw new Error('ModelScope response did not include an image.');
  }

  if (image.b64_json) {
    return {
      imageData: `data:image/png;base64,${image.b64_json}`,
      imageUrl: '',
      model,
      provider: 'modelscope-api-inference',
    };
  }

  if (!image.url) {
    throw new Error('ModelScope image response did not include a URL or base64 payload.');
  }

  const imageData = await downloadImageAsDataUrl(image.url, fetchImpl);

  return {
    imageData,
    imageUrl: image.url,
    model,
    provider: 'modelscope-api-inference',
  };
}
