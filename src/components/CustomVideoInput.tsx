"use client";
import { UploadButton } from "@/utils/uploadthing";
import React, { useState } from "react";
import { toast } from "sonner";
import FullScreenLoader from "./FullScreenLoader";

const CustomVideoInput = ({
  onVideoChange,
}: {
  onVideoChange: (value: string) => void;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <FullScreenLoader />}
      <label className="custom-file-input flex items-center justify-center cursor-pointer">
        <div className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
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
        </div>
        <UploadButton
          className="hidden"
          endpoint="videoUploader"
          onUploadProgress={() => {
            setLoading(true);
          }}
          onClientUploadComplete={(res) => {
            // Do something with the response
            onVideoChange(res[0].url);
            toast.success("Video uploading completed");
            setLoading(false);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error("Something went wrong");
            setLoading(false);
          }}
        />
      </label>
    </>
  );
};

export default CustomVideoInput;
