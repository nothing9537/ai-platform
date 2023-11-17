import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { prompt, amount = '1', resolution = '512x512' } = body.values as { prompt: string, amount: string, resolution: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792' | null };

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API key not configured', { status: 500 });
    }

    if (!prompt || !amount || !resolution) {
      return new NextResponse('Mandatory parameters ( prompt, amount, or resolution ) missing', { status: 400 });
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data.map((image) => image?.url));
  } catch (error) {
    console.error('[IMAGE_POST]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}