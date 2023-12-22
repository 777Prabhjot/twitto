"use client";
import { trpc } from "@/app/_trpc/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProfileHeader({
  tweets,
  userName,
}: {
  tweets?: number;
  userName?: string;
}) {
  const { data } = trpc.userInfo.useQuery();

  return (
    <main role="main">
      <div className="flex w-full">
        <section className="w-full border border-y-0 border-gray-800">
          {/*Content (Center)*/}
          {/* Nav back*/}
          <div>
            <div className="flex justify-start">
              <div className="px-4 py-2 mx-2">
                <Link
                  href={"/"}
                  className=" text-2xl font-medium rounded-full text-blue-400 hover:bg-gray-800 hover:text-blue-300 float-right"
                >
                  <ArrowLeft className="m-2 h-6 w-6 cursor-pointer" size={25} />
                </Link>
              </div>
              <div className="mx-2">
                <h2 className="mb-0 text-xl font-bold text-white capitalize">
                  {tweets ? userName : <>{data?.user?.name}</>}
                </h2>
                <p className="mb-0 w-48 text-xs text-gray-400">
                  {tweets ? tweets : <>{data?.tweets?.length}</>} Tweets
                </p>
              </div>
            </div>
            <hr className="border-gray-800" />
          </div>
        </section>
      </div>
    </main>
  );
}
