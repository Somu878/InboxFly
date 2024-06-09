import { NextRequest, NextResponse } from "next/server";
import { getMessageBody, auth, extractNameFromHeader } from "@/utils/googleApi";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const token: any = await getToken({ req, secret: process.env.JWT_SECRET });
    if (!token) {
      console.error("No token found");
      return NextResponse.json({ error: "Unauthorized" });
    }
    const code = token?.access_token;
    auth.setCredentials({ access_token: code });
    const gmail = google.gmail({ version: "v1", auth });
    const messageDetail = await gmail.users.messages.get({
      userId: "me",
      id: id,
    });

    if (!messageDetail) {
      return NextResponse.json({ error: "No message found" });
    }
    const fromHeader = messageDetail.data.payload?.headers?.find(
      (header) => header.name === "From"
    )?.value;

    const subjectHeader = messageDetail.data.payload?.headers?.find(
      (header) => header.name === "Subject"
    )?.value;

    const message = {
      from: extractNameFromHeader(fromHeader || ""),
      subject: subjectHeader || "",
      snippet: messageDetail.data.snippet,
      body: getMessageBody(messageDetail.data.payload),
    };

    return NextResponse.json(message);
  } catch (error) {
    console.log(error);
  }
}
