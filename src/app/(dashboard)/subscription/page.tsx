import { subscriptionPlans } from "@/config/subscriptions";
import { cn } from "@/lib/utils";
import { serverTrpc } from "@/trpc/trpc-caller";
import { Check } from "lucide-react";
import React from "react";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { ManageUserSubscriptionButton } from "@/components/manage-user-subscription-button";
import { redirect } from "next/navigation";

const Subscription = async () => {
  const session = await serverTrpc.userInfo();
  const subscriptionPlan = await getUserSubscriptionPlan();

  if (!session) return redirect("/");

  return (
    <div className="w-full h-[100vh] lg:h-fit mx-auto mt-2 bg-[#15202b] px-5 text-gray-600 mb-10">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-1 text-white">Pricing</h1>
        <h1 className="mb-4 text-white font-normal text-3xl">
          Our <span className="font-semibold text-gray-600">plans</span> for
          your <span className="font-semibold text-gray-600">strategies</span>
        </h1>
      </div>
      <div className="max-w-4xl mx-auto flex lg:flex-col lg:justify-center lg:items-center lg:w-full">
        <div className="w-1/3 lg:w-full max-w-none bg-white px-10 slg:px-5 slg:h-fit py-10 mb-3 mx-auto my-6 rounded-md shadow-lg shadow-gray-600 flex flex-col">
          <div className="w-full flex-grow flex flex-col items-center">
            <h2 className="text-center text-2xl font-bold uppercase mb-4">
              Basic Plan
            </h2>
            <h3 className="text-center font-bold text-4xl slg:text-2xl mb-5">
              Free
            </h3>
            <ul className="text-sm mb-8">
              <li className="leading-tight font-semibold text-gray-500 flex items-center">
                <Check color="green" size={15} className="me-2" /> 5 Tweets
              </li>
              <li className="leading-tight flex font-semibold text-gray-500 items-center">
                <Check color="green" size={15} className="me-2" /> Profile
                Updation
              </li>
            </ul>
          </div>
          <div className="w-full lg:px-10">
            <button
              disabled
              className="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full"
            >
              Free Plan
            </button>
          </div>
        </div>
        {subscriptionPlans.map((plan, i) => {
          return (
            <div
              key={plan.id}
              className={cn(
                plan.id === "pro"
                  ? "w-1/3 lg:w-full max-w-none bg-white px-10 slg:px-2 py-10 -mx-3 mb-0 rounded-md shadow-lg shadow-gray-600 md:relative z-50 flex flex-col"
                  : "w-1/3 lg:w-full max-w-none bg-white px-10 slg:px-2 py-10 mb-3 mx-auto my-6 rounded-md shadow-lg shadow-gray-600 flex flex-col"
              )}
            >
              <div className="w-full flex-grow flex flex-col items-center">
                <h2 className="text-center text-2xl font-bold uppercase mb-4">
                  {plan.name}
                </h2>
                <h3 className="text-center font-bold text-4xl slg:text-2xl mb-5">
                  {plan.id === "pro"
                    ? `₹${plan.price}/year`
                    : `₹${plan.price}/mo`}
                </h3>
                <ul className="text-sm px-5 mb-8">
                  {plan.description.map((des, i) => (
                    <li
                      key={i}
                      className="leading-tight font-semibold text-gray-500 flex items-center"
                    >
                      <Check color="green" size={15} className="me-2" /> {des}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:px-10">
                {session?.user ? (
                  <ManageUserSubscriptionButton
                    userId={session.user.id}
                    email={session.user.email || ""}
                    stripePriceId={plan.stripePriceId}
                    stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                    isSubscribed={!!subscriptionPlan.isSubscribed}
                    isCurrentPlan={subscriptionPlan?.name === plan.name}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subscription;
