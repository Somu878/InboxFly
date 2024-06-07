"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [apiKey, setApiKey] = useState<string>("");
  const handleSignIn = () => {
    if (!apiKey) {
      return;
    }
    signIn("google", { callbackUrl: "/" });
    localStorage.setItem("openApiKey", apiKey);
  };
  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-36">
        <div className="flex justify-center">
          <button
            className="px-4 py-2 border flex gap-2 border-slate-200 text-l rounded-lg hover:border-gray-600"
            onClick={handleSignIn}
          >
            <Image
              className="w-6 h-6"
              src="/google-color.svg"
              width={24}
              height={24}
              alt="google logo"
            />
            Login with Google
          </button>
        </div>
        <input
          className="bg-[#222630] px-4 py-3 outline-none w-[300px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] md:w-[400px]"
          name="text"
          placeholder="Enter your OpenAi Api key"
          type="text"
          value={apiKey}
          onChange={handleApiKeyChange}
        />
      </div>
    </div>
  );
}
