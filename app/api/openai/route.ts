import openai from "@/utils/openaiApi";
import { NextResponse } from "next/server";

export async function GET() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });
  NextResponse.json({ Response: chatCompletion.choices[0]?.message?.content });
}
