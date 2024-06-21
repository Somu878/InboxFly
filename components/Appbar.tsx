"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Appbar() {
  const { data: session, status } = useSession();
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const handleDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };
  const handleLogout = () => {
    setOpenDropDown(false);
    signOut();
  };

  function DropDown() {
    return (
      <div className="z-20 absolute top-11 right-1 w-40 p-2 bg-slate-800 border rounded-md divide-x text-gray-300">
        {session && status === "authenticated" ? (
          <ul className="cursor-pointer">
            <li>
              <a href="#">My Account</a>
            </li>
            <li>
              <a href="#">Credits</a>
            </li>
            <li className="text-red-600 font-medium" onClick={handleLogout}>
              Signout
            </li>
          </ul>
        ) : (
          <button className="p-1 px-2 rounded-md border border-gray-100 hover:bg-gray-900">
            <Link href="/api/auth/signin">Signin</Link>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative z-20 w-full flex flex-row justify-between items-center border-b border-gray-500 p-2">
      <div className="md:mb-0 flex items-center">
        <Image src={"/mail.png"} width={30} height={30} alt="logo mail" />
        <span className="ml-2 mt-1 text-center text-2xl font-semibold whitespace-nowrap">
          InboxFly
        </span>
      </div>
      <div className="relative">
        <div onClick={handleDropDown}>
          <svg
            fill="#e5e7eb"
            width="40px"
            height="40px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M2 3h12a1 1 0 0 1 0 2H2a1 1 0 1 1 0-2zm0 4h12a1 1 0 0 1 0 2H2a1 1 0 1 1 0-2zm0 4h12a1 1 0 0 1 0 2H2a1 1 0 1 1 0-2z"
              id="a"
            />
          </svg>
        </div>
        {openDropDown && <DropDown />}
      </div>
    </div>
  );
}

export default Appbar;
