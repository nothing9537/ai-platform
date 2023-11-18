import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { prompt } = body as { prompt: string };

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const output = await replicate.run(
      'meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906',
      {
        input: {
          seed: -1,
          top_k: 250,
          top_p: 0,
          prompt: 'Epic melodic deathcore',
          duration: 30,
          temperature: 1,
          continuation: false,
          model_version: 'large',
          output_format: 'mp3',
          continuation_end: 9,
          continuation_start: 7,
          normalization_strategy: 'peak',
          classifier_free_guidance: 3,
        },
      },
    );
  } catch (error) {
    console.error('[MUSIC_POST]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
