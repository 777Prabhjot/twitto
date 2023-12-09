import { CalendarDays, Link } from "lucide-react";
import React from "react";
import EditProfileModal from "./EditProfileModal";
import Image from "next/image";
import { serverTrpc } from "@/trpc/trpc-caller";
import banner from "@/../public/banner.png";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import verify from "@/../public/verify.png";

const ProfileBio = async () => {
  const data = await serverTrpc.userInfo();
  const { isSubscribed, isCanceled } = await getUserSubscriptionPlan();

  const dateObject = new Date(data?.user?.createdAt!);

  const year = dateObject.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    dateObject
  );

  return (
    <div>
      <div className="w-full bg-cover bg-no-repeat bg-center">
        <Image
          className="w-full h-full"
          src={banner}
          width={200}
          height={200}
          alt="banner"
        />
      </div>
      <div className="p-4">
        <div className="relative flex w-full">
          {/* Avatar */}
          <div className="flex flex-1">
            <div style={{ marginTop: "-6rem" }}>
              <div
                style={{ height: "9rem", width: "9rem" }}
                className="md rounded-full relative avatar"
              >
                {!data?.user?.image ? (
                  <div className="rounded-full bg-blue-300 w-[9rem] h-[9rem] flex items-center justify-center">
                    <p className="text-white font-bold text-5xl  uppercase">
                      {data?.user?.name?.slice(0, 1)}
                    </p>
                  </div>
                ) : (
                  <Image
                    width={100}
                    height={100}
                    className="md w-[9rem] h-[9rem] rounded-full relative border-4 border-white"
                    src={data?.user.image}
                    alt=""
                  />
                )}
                <div className="absolute" />
              </div>
            </div>
          </div>
          {/* Follow Button */}
          <div className="flex flex-col text-right">
            <EditProfileModal />
          </div>
        </div>
        {/* Profile info */}
        <div className="space-y-1 justify-center w-full mt-3 ml-3">
          {/* User basic*/}
          <div>
            <div className="flex items-center">
              <h2 className="text-xl leading-6 font-bold text-white capitalize">
                {data?.user?.name}
              </h2>
              {isSubscribed && !isCanceled && (
                <Image
                  className="w-5 h-5 ms-[2px]"
                  src={verify}
                  width={20}
                  height={20}
                  alt="blue-tick"
                />
              )}
            </div>
            <p className="text-sm leading-5 font-medium text-gray-600">
              @{data?.user?.email}
            </p>
          </div>
          {/* Description and others */}
          <div className="mt-3">
            {data?.user?.bio && (
              <p className="text-white leading-tight mb-2">{data?.user?.bio}</p>
            )}
            <div className="text-gray-600 flex">
              {data?.user?.link && (
                <span className="flex mr-2">
                  <Link size={20} />{" "}
                  <a
                    href={data?.user.link}
                    target="_blank"
                    className="leading-5 ml-1 text-blue-400"
                  >
                    {data?.user?.link}
                  </a>
                </span>
              )}
              <span className="flex mr-2">
                <CalendarDays size={20} />{" "}
                <span className="leading-5 ml-1">
                  Joined {month}, {year}
                </span>
              </span>
            </div>
          </div>
          <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
            <div className="text-center pr-3">
              <span className="font-bold text-white">520</span>
              <span className="text-gray-600"> Following</span>
            </div>
            <div className="text-center px-3">
              <span className="font-bold text-white">23,4m </span>
              <span className="text-gray-600"> Followers</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-800" />
    </div>
  );
};

export default ProfileBio;
