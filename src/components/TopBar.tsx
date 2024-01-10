"use client";
import { trpc } from "@/app/_trpc/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { MoonLoader } from "react-spinners";
import { toast } from "sonner";
import UserAvatar from "./UserAvatar";
import CustomFileInput from "./CustomFileInput";
import { X } from "lucide-react";
import PlanModal from "./PlanModal";
import CustomVideoInput from "./CustomVideoInput";
import VideoWarningModal from "./VideoWarningModal";

type PropsType = {
  isSubscribed?: boolean;
  isCanceled?: boolean;
};

const TopBar = ({ isSubscribed, isCanceled }: PropsType) => {
  const [tweet, setTweet] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const { data, status } = useSession();

  const utils = trpc.useUtils();
  const { data: userTweets } = trpc.userInfo.useQuery();
  const { mutate: addTweet, isLoading } = trpc.addTweet.useMutation({
    async onSuccess() {
      toast.success("Tweet posted successfully!");
      utils.allTweets.invalidate();
      utils.userInfo.invalidate();
      setTweet("");
      setImageUrl("");
      setVideoUrl("");
    },
    onError(error) {
      toast.error("Oops something went wrong!");
    },
  });

  const { mutate: deleteFile, isLoading: fileDeleteLoading } =
    trpc.deleteFile.useMutation({
      onSuccess(data) {
        setImageUrl("");
        setVideoUrl("");
      },
    });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTweet(value);
  };

  const handleSubmit = () => {
    addTweet({
      content: tweet,
      imageUrl,
      videoUrl,
    });
  };

  const handleImageUrl = (value: string) => {
    setImageUrl(value);
  };

  const handleVideoUrl = (value: string) => {
    setVideoUrl(value);
  };

  return (
    <aside>
      <div className="flex md:hidden">
        <div className="flex-1 mx-2">
          <h2 className="px-4 py-2 text-xl font-semibold text-white">Home</h2>
        </div>
        <div className="flex-1 px-4 py-2 mx-2">
          <div className=" text-2xl font-medium rounded-full text-white hover:bg-gray-800 hover:text-blue-300 float-right">
            <svg
              className="m-2 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <hr className="border-gray-800 md:mt-5" />
      {/*middle creat tweet*/}
      <div className="flex">
        <div className="m-2 w-10 py-1">
          {status === "loading" ? (
            <SkeletonTheme baseColor="#B0B6BB" highlightColor="#E1E8ED">
              <Skeleton circle={true} width={40} height={40} />
            </SkeletonTheme>
          ) : (
            <>
              {data?.user?.image ? (
                <Image
                  className="inline-block rounded-full"
                  src={data?.user?.image as string}
                  width={40}
                  height={40}
                  alt=""
                />
              ) : (
                <UserAvatar userName={data?.user?.name!} />
              )}
            </>
          )}
        </div>
        <div className="flex-1 px-2 pt-2 mt-2">
          <textarea
            className=" bg-transparent text-gray-400 font-medium text-lg w-full"
            rows={2}
            cols={50}
            value={tweet}
            onChange={handleChange}
            placeholder="What's happening?"
          />
          {imageUrl && (
            <div className="relative w-fit">
              <Image
                className="inline-block rounded-xl"
                src={imageUrl}
                width={140}
                height={90}
                alt=""
              />
              <div className="absolute top-1 right-1 bg-slate-400 p-[3px] rounded-full">
                {fileDeleteLoading ? (
                  <MoonLoader size={15} color="#dbeef6" />
                ) : (
                  <X
                    size={15}
                    className="cursor-pointer"
                    onClick={() => deleteFile(imageUrl)}
                  />
                )}
              </div>
            </div>
          )}
          {videoUrl && (
            <div className="relative w-fit">
              <video width={109} height={20}>
                <source src={videoUrl} />
              </video>
              <div className="absolute top-1 right-1 bg-slate-400 p-[3px] rounded-full">
                {fileDeleteLoading ? (
                  <MoonLoader size={15} color="#dbeef6" />
                ) : (
                  <X
                    size={15}
                    className="cursor-pointer"
                    onClick={() => deleteFile(videoUrl)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/*middle creat tweet below icons*/}
      <div className="flex">
        <div className="w-10 md:w-0" />
        <div className="w-64 px-2">
          <div className="flex items-center">
            <div className="flex-1 text-center px-1 py-1 m-2">
              {isSubscribed && !isCanceled ? (
                <>
                  {imageUrl ? (
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
                  ) : (
                    <CustomFileInput onImageChange={handleImageUrl} />
                  )}
                </>
              ) : (
                <PlanModal
                  imageWarning={true}
                  description="Only Premium and Pro users are allowed to upload images. please
                subscribe to our plan if you want to upload images."
                />
              )}
            </div>
            <div className="flex-1 text-center py-2 m-2">
              {isSubscribed && !isCanceled ? (
                <>
                  {videoUrl ? (
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
                  ) : (
                    <CustomVideoInput onVideoChange={handleVideoUrl} />
                  )}
                </>
              ) : (
                <VideoWarningModal />
              )}
            </div>
            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
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
                  <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>
            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
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
                  <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1">
          {isLoading ? (
            <div className="bg-blue-400 mt-5 py-2 px-8 rounded-full mr-8 float-right">
              <MoonLoader size={20} color="#dbeef6" />
            </div>
          ) : (
            <>
              {isSubscribed === null && (
                <>
                  {5 - Number(userTweets?.tweets.length) <= 0 ? (
                    <PlanModal
                      imageWarning={false}
                      description="Your free 5 tweets limit is exceeded Subscribe to our Premium or Pro plan to continue Tweeting and unlock other features."
                    />
                  ) : (
                    <button
                      disabled={!tweet}
                      className="bg-blue-400 hover:bg-blue-500 mt-5 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
                      onClick={handleSubmit}
                    >
                      Tweet
                    </button>
                  )}
                </>
              )}

              {isSubscribed && isCanceled && (
                <>
                  {5 - Number(userTweets?.tweets.length) <= 0 ? (
                    <PlanModal
                      imageWarning={false}
                      description="Your free 5 tweets limit is exceeded Subscribe to our Premium or Pro plan to continue Tweeting and unlock other features."
                    />
                  ) : (
                    <button
                      disabled={!tweet}
                      className="bg-blue-400 hover:bg-blue-500 mt-5 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
                      onClick={handleSubmit}
                    >
                      Tweet
                    </button>
                  )}
                </>
              )}

              {isSubscribed && !isCanceled && (
                <button
                  disabled={!tweet}
                  className="bg-blue-400 hover:bg-blue-500 mt-5 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
                  onClick={handleSubmit}
                >
                  Tweet
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <hr className="border-gray-800 border-4" />
    </aside>
  );
};

export default TopBar;
