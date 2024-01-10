import Link from "next/link";
import UserMenu from "./UserMenu";
import { CreditCard } from "lucide-react";
import { getUserSubscriptionPlan } from "@/lib/subscription";

const SideBar = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();
  return (
    <div className="text-white" style={{ width: 275 }}>
      <div className="pr-3" style={{ width: 275 }}>
        {/* Nav*/}
        <nav className="mt-5 px-2">
          <Link
            href="/"
            className="group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full bg-gray-800 text-blue-300"
          >
            <svg
              className="mr-4 h-6 w-6 "
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
              />
            </svg>
            Home
          </Link>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300"
          >
            <svg
              className="mr-4 h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            Explore
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300"
          >
            <svg
              className="mr-4 h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            Notifications
          </a>
          <Link
            href={`/messages/${"clr667w4c0000r8jc27zeu3xz"}`}
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300"
          >
            <svg
              className="mr-4 h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Messages
          </Link>
          <Link
            href="/subscription"
            className="mt-1 group text-orange-200 flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-orange-300"
          >
            <CreditCard className="mr-4 ms-[2px]" size={23} />
            Subscription
          </Link>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300"
          >
            <svg
              className="mr-4 h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Lists
          </a>
          <Link
            href="/profile"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300"
          >
            <svg
              className="mr-4 h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </Link>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300"
          >
            <svg
              className="mr-4 h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More
          </a>
          <button className="bg-blue-400 hover:bg-blue-500 w-full mt-5 text-white font-bold py-2 px-4 rounded-full">
            Tweet
          </button>
        </nav>
        {/* User Menu */}
        <UserMenu
          isSubscribed={subscriptionPlan?.isSubscribed as boolean}
          isCanceled={subscriptionPlan?.isCanceled as boolean}
        />
      </div>
    </div>
  );
};

export default SideBar;
