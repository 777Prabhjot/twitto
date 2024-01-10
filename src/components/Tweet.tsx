import Image from "next/image";
import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Heart, MessageCircle, Repeat2, Trash2 } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { MoonLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import verify from "@/../public/verify.png";
import ReactPlayer from "react-player";
import Link from "next/link";

type TweetInfo = {
  tweetId: string;
  tweetBy: string;
  userImage?: string;
  userName: string;
  userEmail: string;
  content: string;
  image?: string;
  video?: string;
  createdAt: string;
  currentUserId: string;
  isSubscribed: boolean;
  isCanceled: boolean;
  tweetLikes: {
    id: string;
    userId: string;
    tweetId: string;
  }[];
};

const Tweet = ({
  tweetId,
  tweetBy,
  userImage,
  userName,
  userEmail,
  content,
  isCanceled,
  isSubscribed,
  image,
  video,
  tweetLikes,
  createdAt,
  currentUserId,
}: TweetInfo) => {
  const [likedUsers, setLikedUsers] = useState<Set<string>>(new Set());

  const utils = trpc.useUtils();
  const { mutate: deleteTweet, isLoading } = trpc.deleteTweet.useMutation({
    onSuccess(data) {
      utils.userInfo.invalidate();
      utils.allTweets.invalidate();
      toast.success("Tweet deleted successfully");
    },
    onError(err) {
      toast.error("Something went wrong");
    },
  });

  const { mutate: likeTweet } = trpc.likeTweet.useMutation();
  const { mutate: removeTweetLike } = trpc.removeTweetLike.useMutation();

  useEffect(() => {
    const tweetLikedUsers = new Set(tweetLikes.map((like) => like.userId));
    setLikedUsers(tweetLikedUsers);
  }, [tweetLikes]);

  const dateObject = new Date(createdAt);

  const day = dateObject.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    dateObject
  );

  const styledText = content.replace(
    /(#\w+)/g,
    '<span style="color: skyblue;">$1</span>'
  );

  const sanitizedHTML = DOMPurify.sanitize(styledText);

  const handleDeleteTweet = () => {
    deleteTweet(tweetId);
  };

  const handleTweetLike = () => {
    try {
      if (isLiked) {
        removeTweetLike(tweetId);
      } else {
        likeTweet(tweetId);
      }

      setLikedUsers((prevLikedUsers) => {
        const updatedLikedUsers = new Set(prevLikedUsers);

        if (isLiked) {
          updatedLikedUsers.delete(currentUserId);
        } else {
          updatedLikedUsers.add(currentUserId);
        }

        return updatedLikedUsers;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isLiked = likedUsers.has(currentUserId);

  return (
    <article className="hover:bg-gray-800 mt-1 transition duration-350 ease-in-out">
      <div className="p-4 pb-0">
        <div className="flex-1 md:flex-wrap md:flex-none group block">
          <div className="flex items-center relative">
            <div>
              {userImage ? (
                <Image
                  className="inline-block rounded-full"
                  src={userImage}
                  width={40}
                  loading="lazy"
                  height={40}
                  alt=""
                />
              ) : (
                <UserAvatar userName={userName} />
              )}
            </div>
            <Link
              href={
                tweetBy === currentUserId ? "/profile" : `/profile/${tweetBy}`
              }
              className="ml-3 w-full cursor-pointer"
            >
              <div className="text-base flex items-center leading-6 font-medium text-white">
                {userName}
                <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @{userEmail?.slice(0, 10)}...
                </span>
                {tweetBy === currentUserId && (
                  <>
                    {isSubscribed && !isCanceled && (
                      <Image
                        className="w-4 h-4 ms-[2px]"
                        src={verify}
                        width={20}
                        height={20}
                        alt="blue-tick"
                      />
                    )}
                  </>
                )}
                <div className="text-sm ms-2 flex leading-5 font-medium text-gray-400">
                  {day}{" "}
                  <span className="hidden md:block ms-1">
                    {month?.slice(0, 3)}
                  </span>
                  <span className="md:hidden ms-1">{month}</span>
                </div>
              </div>
            </Link>
            {tweetBy === currentUserId && (
              <div className="absolute right-0">
                {isLoading ? (
                  <MoonLoader size={20} color="#dbeef6" />
                ) : (
                  <Trash2
                    color="white"
                    size={18}
                    className="cursor-pointer hover:stroke-red-500"
                    onClick={handleDeleteTweet}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pl-16">
        <div className="text-base width-auto font-medium text-white flex-shrink">
          <p dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </div>
        {image && (
          <div className="md:flex-shrink pr-6 pt-3">
            <div className="bg-cover bg-no-repeat bg-center w-full h-fit">
              <Image
                className="rounded-xl w-[370px] md:w-[90%]"
                src={image!}
                width={420!}
                height={200!}
                loading="lazy"
                alt=""
              />
            </div>
          </div>
        )}
        {video && (
          <div className="md:flex-shrink pr-6 pt-3">
            <div className="bg-cover bg-no-repeat bg-center w-full h-fit">
              <ReactPlayer controls url={video} width={420} height={200} />
            </div>
          </div>
        )}
        <div className="flex items-center py-4">
          <div className="flex-1 flex items-center text-white text-xs hover:text-blue-400 transition duration-350 ease-in-out">
            <MessageCircle size={20} className="me-2 cursor-pointer" />
          </div>
          <div className="flex-1 flex items-center text-white text-xs  hover:text-green-400 transition duration-350 ease-in-out">
            <Repeat2 size={20} className="me-2 cursor-pointer" />
          </div>
          <div className="flex-1 flex items-center text-white text-xs transition duration-350 ease-in-out">
            <Heart
              size={20}
              className={cn("me-2 cursor-pointer", isLiked && "fill-red-500")}
              onClick={handleTweetLike}
            />
            {likedUsers.size}
          </div>
          <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <g>
                <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z" />
                <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <hr className="border-gray-800" />
    </article>
  );
};

export default Tweet;
