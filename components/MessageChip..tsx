"use client";
import { ClassifyEmail } from "@/app/lib/actions/classifyEmail.action";
import { useState } from "react";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import ClassifyButton from "./ClassifyButton";

interface MessageChipProps {
  from: string;
  id: string;
  snippet: string;
  subject: string;
  mimType: string;
  tag: string;
}
function MessageChip({ from, snippet, subject, tag }: MessageChipProps) {
  const [res, setres] = useState<string | null>(null);
  const [ClassifyState, setClassifyState] = useState(false);
  const classify = async () => {
    try {
      const response: any = await ClassifyEmail({ from, snippet });
      setres(response);
      setClassifyState(true);
    } catch (error) {}
  };
  return (
    <div className="p-4 border text-sm rounded-lg md:text-base  hover:cursor-pointer">
      <div
        className=" flex flex-row justify-between
       font-bold"
      >
        <div>{from}</div>
        <ClassifyButton action={classify} classified={ClassifyState} />
      </div>
      <p className="font-light pt-1 text-xs md:text-sm">{snippet}</p>
      {res && (
        <TextGenerateEffect
          words={res as string}
          className="border-s-4 border-blue-500 w-full pl-2 rounded-md "
        />
      )}
    </div>
  );
}

export default MessageChip;
