"use client";

import { useEffect, useState } from "react";
import MessageChip from "./MessageChip.";

function MailBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const fetchMessagesFromServer = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/gmail");
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
    fetchMessagesFromServer();
  }, []);
  if (loading) return <div>Loading....</div>;

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
          <MessageChip
            key={index}
            from={message.from}
            snippet={message.snippet}
          />
        ))}
      </div>
    </div>
  );
}

export default MailBox;
