"use client";
import { trpc } from "@/app/_trpc/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { MoonLoader } from "react-spinners";

const UserMenu = () => {
  const { data, status } = useSession();
  const { mutate } = trpc.addUser.useMutation();

  type User = {
    name: string;
    email: string;
  };

  useEffect(() => {
    if (data?.user) {
      const { name, email } = data.user as User;
      mutate({ name, email });
    }
  }, [data?.user]);
  return (
    <div className="absolute w-full" style={{ bottom: "2rem" }}>
      <div className="flex-shrink-0 flex hover:bg-gray-800 rounded-full px-4 py-3 mt-12 mr-2">
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
                  <Image
                    width={20}
                    height={20}
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
                    alt=""
                  />
                )}
              </div>
              <div className="ml-3">
                <p className="text-base leading-6 font-medium text-white">
                  {data?.user && data.user.name}
                </p>
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
