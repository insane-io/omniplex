import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      ...body,
      stream: true,
    }),
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
