"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { trpc } from "@/app/_trpc/client";

const VideoWarningModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const trigger = useRef(null);
  const { data } = trpc.userInfo.useQuery();

  return (
    <>
      <Dialog open={modalOpen}>
        <DialogTrigger asChild>
          <button
            ref={trigger}
            onClick={() => setModalOpen(true)}
            className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300"
          >
            <svg
              className="text-center h-7 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </DialogTrigger>
        <DialogContent className="h-fit">
          <div className="container mx-auto py-20">
            <h3 className="pb-[18px] w-full capitalize text-center text-xl font-semibold text-dark dark:text-white sm:text-2xl">
              Hello {data?.user?.name}
            </h3>
            <div className="flex justify-center">
              <span
                className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
              ></span>
            </div>
            <p className="mb-10 text-center text-base leading-relaxed text-body-color dark:text-dark-6">
              Only Premium and Pro users are allowed to upload videos. please
              subscribe to our plan if you want to upload videos.
            </p>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-1/2 px-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
                >
                  Cancel
                </button>
              </div>
              <div className="w-1/2 px-3">
                <button className="block w-full rounded-md bg-sky-400 p-3 text-center text-base font-medium text-white transition hover:bg-sky-500">
                  <Link href={`/subscription`}> View Plans </Link>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoWarningModal;
