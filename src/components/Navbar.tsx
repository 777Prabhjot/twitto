"use client";
import { trpc } from "@/app/_trpc/client";
import React from "react";

const Navbar = () => {
  const { data } = trpc.users.useQuery();

  return (
    <div className="w-full bg-amber-400 p-3">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[20px]">Twitto</h3>
        <span className="text-md me-7">{data?.name}</span>
      </div>
    </div>
  );
};

export default Navbar;
