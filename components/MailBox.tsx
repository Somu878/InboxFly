"use client";

import { useEffect, useState, Suspense } from "react";
import MessageChip from "./MessageChip.";
import { useSession } from "next-auth/react";

function MailBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const { status } = useSession();
  const fetchMails = async (quantity: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/gmail/all-messages/${quantity}`);
      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setMessages(data);
      } else {
        console.log(data?.error);
        setError(data?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMails(quantity);
  }, [quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };
  if (status === "unauthenticated") {
    return (
      <div className="min-w-screen min-h-[60vh] flex justify-center items-center text-lg text-gray-300">
        Please Sigin with your google account
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-10 m-2 min-w-screen min-h-[60vh]">
      {error && <p>Error: {error}</p>}
      <div className="flex justify-between p-2">
        <select
          className="border bg-gray-900 rounded-lg text-lg"
          onChange={handleQuantityChange}
          value={quantity}
        >
          <option defaultValue={"5"} value="5">
            5
          </option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="flex flex-col gap-4">
        {!loading ? (
          messages.map((message) => (
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
          <div className="flex-col gap-4 flex items-center justify-center">
            <div
              className="m-12 inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MailBox;
