"use client";
import { CalendarDays, Link, Loader2 } from "lucide-react";
import Image from "next/image";
import banner from "@/../public/banner.png";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

const ProfileBio = ({
  image,
  name,
  userId,
}: {
  image: string;
  name: string;
  userId: string;
}) => {
  const utils = trpc.useUtils();

  const { data } = trpc.getUserById.useQuery(userId);
  const { data: userInfo } = trpc.userInfo.useQuery();
  const { mutate, isLoading } = trpc.followUser.useMutation({
    onSuccess: () => {
      utils.getUserById.invalidate(userId);
      utils.userInfo.invalidate();
    },
    onError(err) {
      toast.error("Something went wrong");
    },
  });

  const { mutate: unfollowUser, isLoading: loading } =
    trpc.unfollowUser.useMutation({
      onSuccess: () => {
        utils.getUserById.invalidate(userId);
        utils.userInfo.invalidate();
      },
      onError(err) {
        toast.error("Something went wrong");
      },
    });

  let year = null;
  let month = "";
  if (data) {
    const dateObject = new Date(data.createdAt!);

    year = dateObject.getFullYear();
    month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      dateObject
    );
  }

  let alreadyFollowedRef = false;

  if (userInfo) {
    userInfo?.user?.following?.forEach((item) => {
      if (item.followingId === userId) alreadyFollowedRef = true;
    });
  }

  const handleFollowUser = () => {
    mutate(userId);
  };

  const handleUnfollowUser = () => {
    unfollowUser(userId);
  };
  return (
    <div>
      <div className="w-full bg-cover bg-no-repeat bg-center">
        <Image
          className="w-full h-full sm:h-[200px]"
          src={banner}
          priority={true}
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
                {!image ? (
                  <div className="rounded-full bg-blue-300 w-[9rem] h-[9rem] flex items-center justify-center">
                    <p className="text-white font-bold text-5xl  uppercase">
                      {name?.slice(0, 1)}
                    </p>
                  </div>
                ) : (
                  <Image
                    width={100}
                    height={100}
                    className="md w-[9rem] h-[9rem] md:w-[6rem] md:h-[6rem] rounded-full relative border-4 border-white"
                    src={image}
                    alt=""
                  />
                )}
                <div className="absolute" />
              </div>
            </div>
          </div>
          {/* Follow Button */}
          {alreadyFollowedRef ? (
            <button
              disabled={loading}
              className="w-[130px] h-10 disabled:bg-blue-300 flex justify-center items-center px-3 text-blue-300 border-2 hover:border-none hover:bg-blue-300 hover:text-white border-blue-300 rounded-md focus:outline-none"
              onClick={handleUnfollowUser}
            >
              {loading ? (
                <Loader2 className="text-white animate-spin w-4 h-4 me-1" />
              ) : (
                <>UnFollow</>
              )}
            </button>
          ) : (
            <button
              disabled={isLoading}
              className="w-[130px] h-10 disabled:bg-blue-300 flex justify-center items-center px-3 text-blue-300 border-2 hover:border-none hover:bg-blue-300 hover:text-white border-blue-300 rounded-md focus:outline-none"
              onClick={handleFollowUser}
            >
              {isLoading ? (
                <Loader2 className="text-white animate-spin w-4 h-4 me-1" />
              ) : (
                <>Follow</>
              )}
            </button>
          )}
        </div>
        {/* Profile info */}
        <div className="space-y-1 justify-center w-full mt-3 ml-3">
          {/* User basic*/}
          <div>
            <div className="flex items-center">
              <h2 className="text-xl leading-6 font-bold text-white capitalize">
                {name}
              </h2>
              {/* {isSubscribed && !isCanceled && (
                <Image
                  className="w-5 h-5 ms-[2px]"
                  src={verify}
                  width={20}
                  height={20}
                  alt="blue-tick"
                />
              )} */}
            </div>
            <p className="text-sm leading-5 font-medium text-gray-600">
              {data?.email}
            </p>
          </div>
          {/* Description and others */}
          <div className="mt-3">
            {data?.bio && (
              <p className="text-white leading-tight mb-2">{data.bio}</p>
            )}
            <div className="text-gray-600 flex flex-wrap">
              {data?.link && (
                <div className="flex mr-2">
                  <Link size={20} />{" "}
                  <a
                    href={data?.link}
                    target="_blank"
                    className="leading-5 ml-1 text-blue-400"
                  >
                    {data?.link}
                  </a>
                </div>
              )}
              {data && (
                <div className="flex mr-2 md:mt-2">
                  <CalendarDays size={20} />{" "}
                  <span className="leading-5 ml-1">
                    Joined {month}, {year}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
            <div className="text-center pr-3">
              <span className="font-bold text-white">
                {data?.following?.length}
              </span>
              <span className="text-gray-600"> Following</span>
            </div>
            <div className="text-center px-3">
              <span className="font-bold text-white">
                {data?.followers?.length}{" "}
              </span>
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
