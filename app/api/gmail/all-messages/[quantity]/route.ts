import { google } from "googleapis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { redis } from "@/app/lib/redis";
import {
  auth,
  extractNameFromHeader,
  getMessageBody,
} from "@/app/lib/googleApi";
import { sendStatusCode } from "next/dist/server/api-utils";
export async function GET(
  req: NextRequest,
  { params }: { params: { quantity: number } }
) {
  try {
    const { quantity } = params;
    const token: any = await getToken({ req, secret: process.env.JWT_SECRET });
    if (!token) {
      console.error("No token found");
      return NextResponse.json({ error: "Unauthorized" });
    }
    const code = token?.access_token;
    auth.setCredentials({ access_token: code });
    const gmail = google.gmail({ version: "v1", auth });
    const messageListResponse = await gmail.users.messages.list({
      userId: "me",
    });
    const messages = messageListResponse.data.messages;

    if (!messages) {
      return NextResponse.json({ error: "No messages found" });
    }
    const fullMessages = await Promise.all(
      messages.slice(0, quantity).map(async (message) => {
        const messageDetail = await gmail.users.messages.get({
          userId: "me",
          id: message.id!,
        });

        return {
          id: messageDetail.data.id,
          from: extractNameFromHeader(
            messageDetail.data.payload?.headers?.find(
              (item) => item.name === "From"
            )?.value || ""
          ),
          subject:
            messageDetail.data.payload?.headers?.find(
              (item) => item.name === "Subject"
            )?.value || "",
          snippet: messageDetail.data.snippet,
          mimType: messageDetail.data.payload?.mimeType,
          body: getMessageBody(messageDetail.data.payload),
        };
      })
    );
    // await redis.set(
    //   `messages_${quantity}`,
    //   JSON.stringify(fullMessages.map(({ body, id, mimType, ...rest }) => rest))
    // );
    //redis caching for ai classification
    return NextResponse.json(fullMessages);
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch messages",
      sendStatusCode: 500,
    });
  }
}
