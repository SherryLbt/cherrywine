import { NextRequest, NextResponse } from 'next/server';

import { generateModelScopeImage } from '@/lib/modelscope/image-generation';

const DEFAULT_MODELSCOPE_IMAGE_MODEL = 'MusePublic/489_ckpt_FLUX_1';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.MODELSCOPE_API_KEY || process.env.MODELSCOPE_SDK_TOKEN;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'MODELSCOPE_API_KEY is not configured' },
        { status: 500 },
      );
    }

    const body = (await request.json()) as {
      prompt?: string;
      negativePrompt?: string;
      model?: string;
      size?: string;
    };

    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const result = await generateModelScopeImage({
      apiKey,
      prompt,
      negativePrompt: body.negativePrompt,
      model: body.model || process.env.MODELSCOPE_IMAGE_MODEL || DEFAULT_MODELSCOPE_IMAGE_MODEL,
      size: body.size,
    });

    return NextResponse.json({
      success: true,
      imageData: result.imageData,
      imageUrl: result.imageUrl,
      provider: result.provider,
      model: result.model,
    });
  } catch (error) {
    console.error('Error generating ModelScope image:', error);
    return NextResponse.json(
      {
        error: 'modelscope_generation_failed',
        message: error instanceof Error ? error.message : 'Unknown image generation error',
      },
      { status: 500 },
    );
  }
}
