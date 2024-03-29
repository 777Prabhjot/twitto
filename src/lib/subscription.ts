import { getServerSession } from "next-auth";
import { stripe } from "./stripe";
import { authProviders } from "./auth";
import db from "./db";
import { subscriptionPlans } from "@/config/subscriptions";

export async function getUserSubscriptionPlan() {
  const session = await getServerSession(authProviders);

  if (!session || !session.user) {
    throw new Error("User not found.");
  }

  const user = await db.user.findFirst({
    where: {
      email: session.user.email!,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const isSubscribed =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now();

  const plan = isSubscribed
    ? subscriptionPlans.find(
        (plan) => plan.stripePriceId === user.stripePriceId
      )
    : null;

  let isCanceled = false;
  if (isSubscribed && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
    stripeCustomerId: user.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
}
