import { CalendarDays, Link } from "lucide-react";
import React from "react";
import EditProfileModal from "./EditProfileModal";
import Image from "next/image";
import { serverTrpc } from "@/trpc/trpc-caller";
import banner from "@/../public/banner.png";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import verify from "@/../public/verify.png";
import Followers from "./Followers";

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
          className="w-full h-full sm:h-[200px]"
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
            <div className="md:!mt-[-4rem]" style={{ marginTop: "-6rem" }}>
              <div
                style={{ height: "9rem", width: "9rem" }}
                className="md rounded-full relative avatar md:!w-[6rem] md:!h-[6rem]"
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
                    className="md w-[9rem] h-[9rem] md:w-[6rem] md:h-[6rem] rounded-full relative border-4 border-white"
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
            <div className="text-gray-600 flex flex-wrap">
              {data?.user?.link && (
                <div className="flex mr-2">
                  <Link size={20} />{" "}
                  <a
                    href={data?.user.link}
                    target="_blank"
                    className="leading-5 ml-1 text-blue-400"
                  >
                    {data?.user?.link}
                  </a>
                </div>
              )}
              <div className="flex mr-2 md:mt-2">
                <CalendarDays size={20} />{" "}
                <span className="leading-5 ml-1">
                  Joined {month}, {year}
                </span>
              </div>
            </div>
          </div>
          <Followers />
        </div>
      </div>
      <hr className="border-gray-800" />
    </div>
  );
};

export default ProfileBio;
