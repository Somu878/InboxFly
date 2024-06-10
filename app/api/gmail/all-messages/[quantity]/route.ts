import { google } from "googleapis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getMessageBody, auth, extractNameFromHeader } from "@/utils/googleApi";
import { Quicksand } from "next/font/google";
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
          snippet: messageDetail.data.snippet,
          body: getMessageBody(messageDetail.data.payload),
          all: messageDetail.data,
        };
      })
    );

    return NextResponse.json(fullMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" });
  }
}
