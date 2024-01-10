"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { manageStripeSubscriptionAction } from "@/app/_actions/stripe";

interface ManageUserSubscriptionButtonProps {
  userId: string;
  email: string;
  isCurrentPlan: boolean;
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  stripePriceId: string;
}

export function ManageUserSubscriptionButton({
  userId,
  email,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
}: ManageUserSubscriptionButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const session = await manageStripeSubscriptionAction({
          email,
          userId,
          isSubscribed,
          isCurrentPlan,
          stripeCustomerId,
          stripePriceId,
        });
        if (session) {
          window.location.href = session.url ?? "/subscription";
        }
      } catch (err) {
        console.error((err as Error).message);
        toast.error("Something went wrong, please try again later.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        disabled={isPending}
        className="font-bold bg-gray-600 flex items-center justify-center hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full"
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isCurrentPlan ? "Manage Subscription" : "Subscribe"}
      </button>
    </form>
  );
}
