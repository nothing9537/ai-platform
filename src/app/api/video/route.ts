import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

import { VideoFormSchemaType } from '@/features/ai-request-form';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { prompt, fps, width, height, negative_prompt } = body as VideoFormSchemaType;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const output = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          fps,
          model: 'xl',
          width,
          height,
          prompt,
          batch_size: 1,
          num_frames: 24,
          init_weight: 0.5,
          guidance_scale: 17.5,
          negative_prompt,
          remove_watermark: false,
          num_inference_steps: 50,
        },
      },
    );

    return NextResponse.json(output);
  } catch (error) {
    console.error('[VIDEO_POST]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
