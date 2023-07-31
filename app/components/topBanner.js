"use client"

import { useEffect } from "react";

export default function TopBanner({ messages, setMessages, color }) {
  useEffect(() => {
    let timer;
    if (messages.length > 0) {
      timer = setTimeout(() => {
        setMessages([]);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [messages]);

  return (
    <div className="fixed top-0 left-0 flex flex-col items-center w-screen pt-4">
      {messages.map((message, index) => (
        <div key={index} className={`px-4 py-2 ${color} rounded-lg mb-4`}>{message}</div>
      ))}
    </div>
  );
}
