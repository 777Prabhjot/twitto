"use client";
import { UploadButton } from "@/utils/uploadthing";
import React, { useState } from "react";
import { toast } from "sonner";
import FullScreenLoader from "./FullScreenLoader";

const CustomFileInput = ({
  onImageChange,
}: {
  onImageChange: (value: string) => void;
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
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <UploadButton
          className="hidden"
          endpoint="imageUploader"
          onUploadProgress={() => {
            setLoading(true);
          }}
          onClientUploadComplete={(res) => {
            // Do something with the response
            onImageChange(res[0].url);
            toast.success("Image uploading completed");
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

export default CustomFileInput;
