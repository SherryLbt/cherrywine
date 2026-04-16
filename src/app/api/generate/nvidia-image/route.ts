import { NextRequest, NextResponse } from 'next/server';

import {
  DEFAULT_NVIDIA_IMAGE_MODEL,
  NvidiaImageGenerationError,
  generateNvidiaImage,
} from '@/lib/nvidia/image-generation';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'NVIDIA_API_KEY is not configured' },
        { status: 500 },
      );
    }

    const body = (await request.json()) as {
      prompt?: string;
      negativePrompt?: string;
      model?: string;
      width?: number;
      height?: number;
      cfgScale?: number;
      samples?: number;
      seed?: number;
      steps?: number;
    };

    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const result = await generateNvidiaImage({
      apiKey,
      prompt,
      negativePrompt: body.negativePrompt,
      model: body.model || process.env.NVIDIA_IMAGE_MODEL || DEFAULT_NVIDIA_IMAGE_MODEL,
      apiBaseUrl: process.env.NVIDIA_API_BASE_URL,
      endpoint: process.env.NVIDIA_IMAGE_ENDPOINT,
      width: body.width,
      height: body.height,
      cfgScale: body.cfgScale,
      samples: body.samples,
      seed: body.seed,
      steps: body.steps,
    });

    return NextResponse.json({
      success: true,
      imageData: result.imageData,
      imageUrl: result.imageUrl || '',
      provider: result.provider,
      model: result.model,
    });
  } catch (error) {
    if (error instanceof NvidiaImageGenerationError && error.status === 429) {
      return NextResponse.json(
        {
          error: 'quota_exceeded',
          message: error.message,
        },
        { status: 429 },
      );
    }

    console.error('Error generating NVIDIA image:', error);

    return NextResponse.json(
      {
        error: 'nvidia_generation_failed',
        message: error instanceof Error ? error.message : 'Unknown image generation error',
      },
      { status: 500 },
    );
  }
}
