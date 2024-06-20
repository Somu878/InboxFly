"use server";

import { client } from "../mistralAi";
interface emailContentProps {
  from: string;
  snippet: string;
}
export async function ClassifyEmail(emailContent: emailContentProps) {
  try {
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
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}
