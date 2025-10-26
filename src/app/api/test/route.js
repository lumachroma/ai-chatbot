import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o'),
      system: `You are a helpful AI assistant named "${process.env.AI_NAME}".`,
      prompt: 'Give a brief 2-sentence introduction of yourself',
    });
    return NextResponse.json(
      { message: text },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 },
    );
  }
}