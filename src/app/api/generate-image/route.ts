import { NextRequest, NextResponse } from 'next/server';

// wan2.5 and below models use text2image/image-synthesis endpoint
const MODELSCOPE_API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis';
const MODELSCOPE_TASK_URL = 'https://dashscope.aliyuncs.com/api/v1/tasks';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.MODELSCOPE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'MODELSCOPE_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Step 1: Create async task
    const createResponse = await fetch(MODELSCOPE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-Async': 'enable'
      },
      body: JSON.stringify({
        model: 'wanx2.1-t2i-turbo',
        input: {
          prompt: prompt,
          negative_prompt: '',
          seed: 42,
          n: 1
        },
        parameters: {
          size: '1024*1024',
          watermark: false
        }
      })
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('Failed to create task:', errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        const errorCode = errorJson.code || '';
        const errorMessage = errorJson.message || '';
        
        // Check for quota exceeded or 403 errors
        if (createResponse.status === 403 || errorCode === 'QuotaExhausted' || errorMessage.includes('额度') || errorMessage.includes('quota')) {
          return NextResponse.json({
            error: 'quota_exceeded',
            message: 'API额度已耗尽，请检查您的魔搭账户配额或稍后再试。',
            details: errorMessage
          }, { status: 403 });
        }
        
        return NextResponse.json(
          { error: errorMessage || `Failed to create task: ${createResponse.status}`, code: errorCode },
          { status: createResponse.status }
        );
      } catch {
        return NextResponse.json(
          { error: `Failed to create task: ${createResponse.status}` },
          { status: createResponse.status }
        );
      }
    }

    const createResult = await createResponse.json();
    const taskId = createResult.output?.task_id;

    if (!taskId) {
      return NextResponse.json(
        { error: 'No task_id returned' },
        { status: 500 }
      );
    }

    // Step 2: Poll for task completion
    const maxAttempts = 60; // 60 attempts * 2 seconds = 2 minutes max
    const pollInterval = 2000; // 2 seconds

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));

      const taskResponse = await fetch(`${MODELSCOPE_TASK_URL}/${taskId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (!taskResponse.ok) {
        console.error(`Failed to check task status: ${taskResponse.status}`);
        continue;
      }

      const taskResult = await taskResponse.json();
      const status = taskResult.output?.task_status;

      if (status === 'SUCCEEDED') {
        const imageUrl = taskResult.output?.results?.[0]?.url;
        if (imageUrl) {
          // Fetch the image and convert to base64
          const imageResponse = await fetch(imageUrl);
          const imageBuffer = await imageResponse.arrayBuffer();
          const base64 = Buffer.from(imageBuffer).toString('base64');
          const mimeType = imageResponse.headers.get('content-type') || 'image/png';

          return NextResponse.json({
            success: true,
            imageData: `data:${mimeType};base64,${base64}`
          });
        } else {
          return NextResponse.json(
            { error: 'No image URL in result' },
            { status: 500 }
          );
        }
      } else if (status === 'FAILED') {
        return NextResponse.json(
          { error: taskResult.output?.message || 'Task failed' },
          { status: 500 }
        );
      }
      // Continue polling for PENDING or RUNNING status
    }

    return NextResponse.json(
      { error: 'Task timed out' },
      { status: 408 }
    );

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
