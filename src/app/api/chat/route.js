import { createOpenAI } from "@ai-sdk/openai";
import { streamText, smoothStream } from "ai";

export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_TOKEN,
  });

  const result = await streamText({
    model: openai('gpt-4o'),
    system: `You are a helpful AI assistant named "${process.env.AI_NAME}".`,
    messages,
    experimental_transform: smoothStream(),
  });

  return result.toDataStreamResponse();
}
