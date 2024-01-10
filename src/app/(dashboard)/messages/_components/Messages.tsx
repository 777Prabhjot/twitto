"use client";
import { trpc } from "@/app/_trpc/client";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useState } from "react";

interface MessagesProps {
  roomId: string;
}

const Messages = ({ roomId }: MessagesProps) => {
  const [initialMessages, setInitialMessages] = useState<string[]>([]);
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    const handleIncomingMessage = (text: string) => {
      if (!incomingMessages.includes(text)) {
        setIncomingMessages((prev) => [...prev, text]);
      }
    };

    pusherClient.bind("incoming-message", handleIncomingMessage);

    return () => {
      pusherClient.unbind("incoming-message", handleIncomingMessage);
      pusherClient.unsubscribe(roomId);
    };
  }, [roomId, incomingMessages]);

  const { data, isSuccess } = trpc.existingMessages.useQuery(roomId);

  useEffect(() => {
    if (isSuccess) {
      data?.forEach((message) => {
        setInitialMessages((prev) => [...prev, message.text]);
      });
    }
  }, [isSuccess]);

  console.log(initialMessages);

  return (
    <div className="bg-white h-[365px] md:w-[90vw] md:h-[500px] w-full rounded-lg rounded-b-none p-12 flex flex-col items-start overflow-y-scroll">
      {isSuccess && (
        <>
          {initialMessages.map((message, i) => (
            <div key={i}>
              <div className="flex items-center flex-row-reverse mb-4">
                <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
                  <div>{message}</div>

                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {incomingMessages.map((text, i) => (
        <div key={i}>
          <div className="flex items-center flex-row-reverse mb-4">
            <div className="bg-indigo-100 w-fit text-gray-800 p-2 rounded-lg mb-2 relative">
              <div>{text}</div>

              <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
