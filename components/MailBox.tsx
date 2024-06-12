"use client";

import { useEffect, useState } from "react";
import MessageChip from "./MessageChip.";
import Sidebar from "./Sidebar";
function MailBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fetchMails = async (quantity: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/gmail/all-messages/${quantity}`);
      const data = await response.json();
      if (response.ok) {
        setMessages(data);
      } else {
        setError(data.error || "Failed to fetch messages");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch messages");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchMails(quantity);
  }, [quantity]);
  const handleChipClick = (email: any) => {
    setSelectedEmail(email);

    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      {error && <p>Error: {error}</p>}
      <div className="flex justify-between p-2">
        <select
          className="border bg-gray-900 rounded-lg text-lg"
          onChange={handleQuantityChange}
          value={quantity}
        >
          <option selected value="5">
            5
          </option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <button className="flex flex-row gap-2 border rounded-lg p-1 items-center justify-center">
          <svg
            height="16"
            width="16"
            fill="#FFFFFF"
            viewBox="0 0 24 24"
            data-name="Layer 1"
            id="Layer_1"
            className="sparkle"
            color="yellow"
          >
            <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
          </svg>
          <span>Classify</span>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <MessageChip
            key={message.tag}
            id={message.id}
            mimType={message.mimType}
            from={message.from}
            snippet={message.snippet}
            subject={message.subject}
            loading={loading}
            onclick={() => handleChipClick(message)}
            tag={""}
          />
        ))}
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        emailContent={selectedEmail}
      />
    </div>
  );
}

export default MailBox;
