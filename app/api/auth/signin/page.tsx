"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignIn(providers: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="flex flex-col gap-36">
        <div className="flex justify-center">
          <button
            className="px-4 py-2 border flex gap-2 border-slate-200 text-l rounded-lg"
            onClick={() => signIn("google", { callbackUrl: "/" })}
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
        />
      </div>
    </div>
  );
}
