"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { trpc } from "@/app/_trpc/client";

type PropsType = {
  imageWarning: boolean;
  description: string;
};

const PlanModal = ({ imageWarning, description }: PropsType) => {
  const [modalOpen, setModalOpen] = useState(false);

  const trigger = useRef(null);
  const { data } = trpc.userInfo.useQuery();

  return (
    <>
      <Dialog open={modalOpen}>
        <DialogTrigger asChild>
          {imageWarning ? (
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
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </button>
          ) : (
            <button
              ref={trigger}
              onClick={() => setModalOpen(true)}
              className="bg-blue-400 hover:bg-blue-500 mt-5 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
            >
              Tweet
            </button>
          )}
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
              {description}
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

export default PlanModal;
