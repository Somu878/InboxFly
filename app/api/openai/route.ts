import { NextRequest, NextResponse } from "next/server";

import openai from "@/utils/openaiApi";

export async function GET(req: NextRequest) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Say this is a test" }],
  });

  NextResponse.json({ result: completion.choices[0]?.message?.content });
}
