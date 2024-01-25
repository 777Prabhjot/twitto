"use client";
import { cn } from "@/lib/utils";
import { navigations } from "@/utils/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBarLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="mt-5 px-2">
      {navigations.map((nav) => (
        <Link
          key={nav.name}
          href={nav.path}
          className={cn(
            pathname === nav.path
              ? "mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full bg-gray-800 text-blue-300"
              : nav.name === "Subscription"
              ? "mt-1 group text-orange-200 flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-orange-300"
              : "mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
          )}
        >
          <nav.icon classNames="mr-4 h-6 w-6" />
          {nav.name}
        </Link>
      ))}
      <button className="bg-blue-400 hover:bg-blue-500 w-full mt-5 text-white font-bold py-2 px-4 rounded-full">
        Tweet
      </button>
    </nav>
  );
};

export default SideBarLinks;
