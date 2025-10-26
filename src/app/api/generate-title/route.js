import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const { text } = await generateText({
      model: openai('gpt-4o'),
      system: "You are a helpful assistant that generates concise titles for conversations.",
      prompt: `Use this first message from a conversation to generate concise title without any quotes (max 5 words): "${message}"`,
    });

    return NextResponse.json(
      { title: text },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate title" },
      { status: 500 },
    );
  }
}
