import { google } from "googleapis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000"
);
function decodeBase64(encodedString: string): string {
  return Buffer.from(encodedString, "base64").toString("utf-8");
}

function getMessageBody(payload: any): string {
  let body = "";
  if (payload.parts) {
    payload.parts.forEach((part: any) => {
      if (part.mimeType === "text/plain" && part.body.data) {
        body += decodeBase64(part.body.data);
      } else if (part.mimeType === "text/html" && part.body.data) {
        body += decodeBase64(part.body.data);
      } else if (part.parts) {
        body += getMessageBody(part);
      }
    });
  } else if (payload.body && payload.body.data) {
    body = decodeBase64(payload.body.data);
  }
  return body;
}

export async function GET(req: NextRequest) {
  try {
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
      messages.map(async (message) => {
        const messageDetail = await gmail.users.messages.get({
          userId: "me",
          id: message.id!,
        });
        return {
          from: messageDetail.data.payload?.headers?.filter(
            (item) => item.name === "From"
          )?.value,
          Subject: messageDetail.data.payload?.headers?.filter((item) => {
            item.name === "Subject";
          }),
          snippet: messageDetail.data.snippet,
          body: getMessageBody(messageDetail.data.payload),
        };
      })
    );

    return NextResponse.json(fullMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" });
  }
}
