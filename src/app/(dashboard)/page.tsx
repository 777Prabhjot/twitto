import Feeds from "@/components/Feeds";
import TopBar from "@/components/TopBar";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export default async function Home() {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <div className="h-full">
      <div className="max-w-[600px] md:max-w-full ms-16 md:ms-3">
        <TopBar
          isSubscribed={subscriptionPlan?.isSubscribed as boolean}
          isCanceled={subscriptionPlan?.isCanceled as boolean}
        />
        <Feeds
          isSubscribed={subscriptionPlan?.isSubscribed as boolean}
          isCanceled={subscriptionPlan?.isCanceled as boolean}
        />
      </div>
    </div>
  );
}
