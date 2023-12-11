"use client";
import { trpc } from "@/app/_trpc/client";
import { MousePointerSquare } from "lucide-react";
import React from "react";

const Counter = () => {
  const { data } = trpc.userInfo.useQuery();
  return (
    <>
      <MousePointerSquare color="white" size={20} />
      <p className="text-white font-bold ms-2">
        {5 - Number(data?.tweets.length) < 0
          ? 0
          : 5 - Number(data?.tweets.length)}{" "}
        Tweets Left
      </p>
    </>
  );
};

export default Counter;
