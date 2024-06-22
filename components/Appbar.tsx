"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";

function Appbar() {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const handleDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };

  return (
    <>
      <div className="relative z-20 w-full flex flex-row justify-between items-center border-b border-gray-500 p-2">
        <Sidebar isOpen={openDropDown} onClose={() => setOpenDropDown(false)} />
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
        </div>
      </div>
    </>
  );
}

export default Appbar;
