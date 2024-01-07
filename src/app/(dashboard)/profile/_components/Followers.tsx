"use client";
import { trpc } from "@/app/_trpc/client";
import React from "react";

const Followers = () => {
  const { data } = trpc.userInfo.useQuery();

  return (
    <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
      <div className="text-center pr-3">
        <span className="font-bold text-white">
          {data?.user?.following?.length}
        </span>
        <span className="text-gray-600"> Following</span>
      </div>
      <div className="text-center px-3">
        <span className="font-bold text-white">
          {data?.user?.followers?.length}
        </span>
        <span className="text-gray-600"> Followers</span>
      </div>
    </div>
  );
};

export default Followers;
