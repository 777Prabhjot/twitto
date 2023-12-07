import { CreditCard, Gem, Medal, MousePointerSquare, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { authProviders } from "@/lib/auth";
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { cn } from "@/lib/utils";
import { serverTrpc } from "@/trpc/trpc-caller";
import Link from "next/link";
import Logout from "./Logout";

export async function DropDown() {
  const data = await getServerSession(authProviders);
  const user = await serverTrpc.userInfo();
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          subscriptionPlan?.isSubscribed && !subscriptionPlan?.isCanceled
            ? subscriptionPlan?.name === "Premium"
              ? "flex items-center bg-gradient-to-r from-orange-300 to-orange-500 border-2 border-orange-300 px-4 py-1 rounded-3xl"
              : "flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 border-2 border-cyan-500 px-4 py-1 rounded-3xl"
            : "flex items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% border-2 border-indigo-500 px-4 py-1 rounded-3xl"
        )}
      >
        <div className="me-2 flex items-center">
          {subscriptionPlan?.isSubscribed && !subscriptionPlan?.isCanceled ? (
            <>
              {subscriptionPlan?.name === "Premium" ? (
                <Medal size={20} />
              ) : (
                <Gem size={20} />
              )}
              <p className="text-black font-bold ms-2">
                {subscriptionPlan?.name}
              </p>
            </>
          ) : (
            <>
              <MousePointerSquare color="white" size={20} />
              <p className="text-white font-bold ms-2">
                {5 - Number(user?.tweets?.length) < 0
                  ? 0
                  : 5 - Number(user?.tweets?.length)}{" "}
                Tweets Left
              </p>
            </>
          )}
        </div>
        {data?.user?.image ? (
          <Image
            className="rounded-full cursor-pointer border border-black"
            src={data?.user?.image!}
            width={30}
            height={30}
            alt="user-picture"
          />
        ) : (
          <UserAvatar userName={data?.user?.name!} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/profile"} className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/subscription"} className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
