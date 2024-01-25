import UserMenu from "./UserMenu";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import SideBarLinks from "./SideBarLinks";

const SideBar = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();
  return (
    <div className="text-white" style={{ width: 275 }}>
      <div className="pr-3" style={{ width: 275 }}>
        {/* Nav*/}
        <SideBarLinks />
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
