"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { MoonLoader } from "react-spinners";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";
import verify from "@/../public/verify.png";
import { trpc } from "@/app/_trpc/client";

type PropsType = {
  isSubscribed?: boolean;
  isCanceled?: boolean;
};

const UserMenu = ({ isSubscribed, isCanceled }: PropsType) => {
  const { status } = useSession();
  const { data } = trpc.userInfo.useQuery();
  const navigate = useRouter();

  return (
    <div className="w-full pb-3" style={{ bottom: "2rem" }}>
      <div
        className="flex-shrink-0 flex hover:bg-gray-800 rounded-full px-4 py-3 mt-3 mr-2"
        onClick={() => navigate.push("/profile")}
      >
        {status === "loading" ? (
          <div className="flex justify-center w-full">
            <MoonLoader size={20} color="#dbeef6" />
          </div>
        ) : (
          <a href="#" className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div>
                {data?.user?.image ? (
                  <Image
                    width={20}
                    height={20}
                    className="inline-block h-10 w-10 rounded-full"
                    src={data.user.image}
                    alt=""
                  />
                ) : (
                  <UserAvatar userName={data?.user?.name!} />
                )}
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <p className="text-base leading-6 font-medium text-white">
                    {data?.user && data.user.name}
                  </p>
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
                <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @{data?.user && data.user.email}
                </p>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
