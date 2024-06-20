"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
function Appbar() {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
  };
  return (
    <div className="w-full flex flex-row justify-between items-center  border-b border-gray-500 p-3">
      <div className="md:mb-0 flex   items-center">
        <Image src={"/mail.png"} width={30} height={30} alt="logo mail" />
        <span className="ml-2 mt-1  text-center text-2xl font-semibold whitespace-nowrap">
          InboxFly
        </span>
      </div>
      {session && status === "authenticated" ? (
        <div className="flex items-center gap-3">
          <Image
            src={session?.user?.image || "/default-profile.png"}
            width={35}
            height={35}
            alt="user's profile"
            className="rounded-full"
          />
          <button
            className="p-1 px-2 rounded-md border  border-gray-100  hover:bg-gray-900"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      ) : (
        <button className="p-1 px-2 rounded-md border  border-gray-100  hover:bg-gray-900">
          <Link href="/api/auth/signin">Signin</Link>
        </button>
      )}
    </div>
  );
}

export default Appbar;
