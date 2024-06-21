"use client";

import { useEffect, useState, Suspense } from "react";
import MessageChip from "./MessageChip.";
import { signOut, useSession } from "next-auth/react";
import SignInPage from "@/app/api/auth/signin/page";

function MailBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(7);
  const [loading, setLoading] = useState<boolean>(false);
  const { status } = useSession();
  const fetchMails = async (quantity: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/gmail/all-messages/${quantity}`);
      const data = await response.json();
      if (response.ok) {
        if (data?.error) {
          signOut();
        }
        setLoading(false);
        setMessages(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      fetchMails(quantity);
    }
  }, [quantity, status]);
  const handleLoadBtn = () => {
    setQuantity(quantity + 3);
  };
  // const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setQuantity(parseInt(e.target.value, 10));
  // };
  if (status === "unauthenticated") {
    return <SignInPage />;
  }

  return (
    <div className="min-w-screen h-full">
      <h1 className="m-2 font-semibold text-lg">Your recent emails</h1>
      <div className="flex flex-col gap-4 mt- m-2">
        {!loading ? (
          messages?.map((message) => (
            <MessageChip
              key={message.id}
              id={message.id}
              mimType={message.mimType}
              from={message.from}
              snippet={message.snippet}
              subject={message.subject}
              tag={message.tag}
            />
          ))
        ) : (
          <div className="h-screen flex items-center justify-center ">
            <div
              className="-mt-10 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>
        )}
      </div>
      {!loading && (
        <div className="flex justify-center items-center">
          <button className="border p-1 rounded-md" onClick={handleLoadBtn}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

export default MailBox;
