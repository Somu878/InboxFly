"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Appbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userImage = session?.user?.image || "/default-profile.png"; // Default image URL
  if (status == "unauthenticated") {
    router.push("/api/auth/signin");
  }

  return (
    <div className="flex items-center justify-between p-4 text-white">
      <div className="flex items-center">
        {session?.user?.image && (
          <Image
            src={userImage}
            width={40}
            height={40}
            alt="user's profile"
            className="rounded-full"
          />
        )}
        <div className="ml-4">
          <div className="font-bold">Hello! {session?.user?.name}</div>
          <div>{session?.user?.email}</div>
        </div>
      </div>
      <button
        onClick={() => signOut()}
        className="px-4 py-2  font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Sign out
      </button>
    </div>
  );
}

export default Appbar;
