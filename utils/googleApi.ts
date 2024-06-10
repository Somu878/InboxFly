import { google } from "googleapis";

export const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXTAUTH_URL
);
function decodeBase64(encodedString: string): string {
  return Buffer.from(encodedString, "base64").toString("utf-8");
}

export function getMessageBody(payload: any): string {
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
export function extractNameFromHeader(headerValue: string): string {
  const nameMatch = headerValue.match(/^(.*?)(?=\s*<)/);
  return nameMatch ? nameMatch[1] : headerValue;
}
