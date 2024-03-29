"use client";
import axios from "axios";
import Messages from "./Messages";
import { useState } from "react";

const ChatBox = ({ roomId }: { roomId: string }) => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (text: string) => {
    await axios.post("/api/message", { text, roomId }).then((res) => {
      if (res.data.success) {
        setMessage("");
      }
    });
  };

  return (
    <div className="w-full p-7 relative mt-5 sm:mt-10 mx-auto">
      <div className="absolute md:top-[-1%] top-[-3%] left-[40%]">
        <p className="text-white font-bold md:text-lg sm:!text-xl text-xl">
          Chat Room
        </p>
      </div>
      <Messages roomId={roomId} />
      <div>
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center md:w-[90vw] py-2 px-3 bg-gray-50 border-t-2 rounded-lg rounded-t-none dark:bg-gray-700">
          <textarea
            id="chat"
            rows={1}
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            onClick={() => sendMessage(message)}
          >
            <svg
              className="w-6 h-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
