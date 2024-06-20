"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
export default function SignInPage() {
  const handleSignIn = async () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="z-10 flex flex-col justify-center  gap-5 h-full pt-32">
      <h1 className="relative  text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
        Welcome to InboxFly
      </h1>
      <div className="flex flex-col justify-center items-center mt-28 gap-28 z-10">
        <div className="flex justify-center">
          <button
            className="px-4 py-2 border flex gap-2 border-slate-200 text-l rounded-lg hover:border-gray-600 disabled:cursor-not-allowed"
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
      </div>
    </div>
  );
}
