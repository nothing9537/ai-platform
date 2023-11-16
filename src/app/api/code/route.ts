import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructions: ChatCompletionMessageParam = {
  role: 'system',
  content: 'You are code generator. You must answer markdown code, and short description of your actions. Use code comments for explanations.',
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { messages } = body as { messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] };

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API key not configured', { status: 500 });
    }

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [instructions, ...messages],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error('[CODE_POST]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}
