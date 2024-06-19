import { client } from "../../lib/mistralAi";
import { redis } from "@/app/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const emailData: any = await redis.get("messages_5");
    const emailContent = emailData[5];
    const chatResponse = await client.chat({
      model: "mistral-small",
      messages: [
        {
          role: "user",

          content: `Summarize the following email, focusing on the key message and eliminating unnecessary details: ${JSON.stringify(
            emailContent
          )}`,
        },
      ],
    });
    const res = chatResponse.choices[0].message.content;
    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
