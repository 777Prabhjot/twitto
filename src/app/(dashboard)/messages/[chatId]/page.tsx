import React from "react";
import ChatBox from "../_components/ChatBox";

interface PageProps {
  params: {
    chatId: string;
  };
}

const ChatRoom = ({ params }: PageProps) => {
  return <ChatBox roomId={params.chatId} />;
};

export default ChatRoom;
