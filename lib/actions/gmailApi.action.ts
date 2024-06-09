"use server";
import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
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

export default async function fetchMessages() {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.access_token;
    if (!token) {
      console.error("No token found");
      return { error: "Unauthorized" };
    }
    const accessToken = token.accessToken;

    auth.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: "v1", auth });
    const messageListResponse = await gmail.users.messages.list({
      userId: "me",
    });
    const messages = messageListResponse.data.messages;

    if (!messages) {
      return { error: "No messages found" };
    }
    const fullMessages = await Promise.all(
      messages.map(async (message) => {
        const messageDetail = await gmail.users.messages.get({
          userId: "me",
          id: message.id!,
        });

        return {
          from: messageDetail.data.payload?.headers?.find(
            (item) => item.name === "From"
          )?.value,
          subject: messageDetail.data.payload?.headers?.find(
            (item) => item.name === "Subject"
          )?.value,
          snippet: messageDetail.data.snippet,
          body: getMessageBody(messageDetail.data.payload),
        };
      })
    );

    return fullMessages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { error: "Failed to fetch messages" };
  }
}
