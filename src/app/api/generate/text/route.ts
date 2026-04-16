import { NextRequest, NextResponse } from 'next/server';

import { baseMap, garnishMap, glasswareMap, mixerMap } from '@/lib/cocktail/ingredients';
import {
  DEFAULT_NVIDIA_TEXT_MODEL,
  NvidiaTextGenerationError,
  generateNvidiaCocktailCopy,
} from '@/lib/nvidia/text-generation';

type GenerateTextBody = {
  base?: string | null;
  mixers?: string[];
  garnishes?: string[];
  glassware?: string | null;
  prompt?: string;
};

function getSelectedIds(keys: string[], options: Record<string, { id: string }>) {
  return keys.map((key) => options[key]?.id).filter((id): id is string => Boolean(id));
}

function getSelectedNames(keys: string[], options: Record<string, { name: string }>) {
  return keys.map((key) => options[key]?.name).filter((name): name is string => Boolean(name));
}

function getFallbackCopy({
  baseName,
  mixerNames,
  garnishNames,
  glassName,
}: {
  baseName: string;
  mixerNames: string[];
  garnishNames: string[];
  glassName: string;
}) {
  const suffixes = ['微醺', '夜曲', '余韵', '之光', '特调'];
  const fingerprint = `${baseName}|${mixerNames.join(',')}|${garnishNames.join(',')}|${glassName}`;
  const suffix = suffixes[fingerprint.length % suffixes.length];
  const garnishForName = garnishNames[0] ? garnishNames[0].replace(/[\/（(].*$/, '') : '';
  const name = `${garnishForName}${baseName}${suffix}`.slice(0, 12) || '灵感特调';

  const mixerSummary = mixerNames.length > 0 ? mixerNames.join('、') : '经典辅料';
  const garnishSummary = garnishNames.length > 0 ? garnishNames.join('、') : '简洁装饰';
  const description =
    `以${baseName}为基底，融合${mixerSummary}，并以${garnishSummary}点缀，` +
    `在${glassName}中呈现出层次分明、口感平衡的微醺风味。`;

  return { name, description };
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'NVIDIA_API_KEY is not configured' },
        { status: 500 },
      );
    }

    const body = (await request.json()) as GenerateTextBody;
    const baseKey = body.base || '';
    const mixerKeys = Array.isArray(body.mixers) ? body.mixers : [];
    const garnishKeys = Array.isArray(body.garnishes) ? body.garnishes : [];
    const glasswareKey = body.glassware || '';

    const baseOption = baseMap[baseKey];
    const glassOption = glasswareMap[glasswareKey];
    const mixerIds = getSelectedIds(mixerKeys, mixerMap);
    const garnishIds = getSelectedIds(garnishKeys, garnishMap);
    const mixerNames = getSelectedNames(mixerKeys, mixerMap);
    const garnishNames = getSelectedNames(garnishKeys, garnishMap);

    const baseName = baseOption?.name || '鸡尾酒';
    const baseId = baseOption?.id || 'Classic spirit';
    const glassName = glassOption?.name || '鸡尾酒杯';
    const glassId = glassOption?.id || 'cocktail glass';

    const ingredientList = [baseId, ...mixerIds].filter(Boolean).join(', ') || 'Classic spirits';
    const garnishList = garnishIds.join(', ') || 'No garnish';

    try {
      const result = await generateNvidiaCocktailCopy({
        apiKey,
        ingredientList,
        garnishList,
        glassware: glassId,
        imagePrompt: body.prompt?.trim(),
        model: process.env.NVIDIA_TEXT_MODEL || DEFAULT_NVIDIA_TEXT_MODEL,
        apiBaseUrl: process.env.NVIDIA_TEXT_API_BASE_URL,
        endpoint: process.env.NVIDIA_TEXT_ENDPOINT,
      });

      return NextResponse.json({
        success: true,
        name: result.name,
        description: result.description,
        provider: result.provider,
        model: result.model,
      });
    } catch (error) {
      const fallback = getFallbackCopy({
        baseName,
        mixerNames,
        garnishNames,
        glassName,
      });

      if (error instanceof NvidiaTextGenerationError) {
        console.warn('NVIDIA text generation failed, using fallback:', error.message);
      } else {
        console.warn('Unknown text generation failure, using fallback:', error);
      }

      return NextResponse.json({
        success: true,
        name: fallback.name,
        description: fallback.description,
        provider: 'local-fallback',
        model: 'local-template',
        fallback: true,
      });
    }
  } catch (error) {
    console.error('Error generating cocktail copy:', error);
    return NextResponse.json(
      {
        error: 'text_generation_failed',
        message: error instanceof Error ? error.message : 'Unknown text generation error',
      },
      { status: 500 },
    );
  }
}
