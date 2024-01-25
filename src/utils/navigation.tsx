import {
  Bell,
  ClipboardList,
  CreditCard,
  Hash,
  HomeIcon,
  Mail,
  MoreHorizontal,
  UserRound,
} from "lucide-react";

type classType = {
  classNames: string;
};

const homeIcons = ({ classNames }: classType) => (
  <HomeIcon className={classNames} />
);
const hashIcon = ({ classNames }: classType) => <Hash className={classNames} />;
const bellIcon = ({ classNames }: classType) => <Bell className={classNames} />;
const mailIcon = ({ classNames }: classType) => <Mail className={classNames} />;
const creditCardIcon = ({ classNames }: classType) => (
  <CreditCard className={classNames} />
);
const clipboardListIcon = ({ classNames }: classType) => (
  <ClipboardList className={classNames} />
);
const userRoundIcon = ({ classNames }: classType) => (
  <UserRound className={classNames} />
);
const moreHorizontalIcon = ({ classNames }: classType) => (
  <MoreHorizontal className={classNames} />
);

export const navigations = [
  {
    path: "/",
    name: "Home",
    icon: homeIcons,
  },
  {
    path: "#",
    name: "Explore",
    icon: hashIcon,
  },
  {
    path: "#",
    name: "Notifications",
    icon: bellIcon,
  },
  {
    path: "/messages/clr667w4c0000r8jc27zeu3xz",
    name: "Messages",
    icon: mailIcon,
  },
  {
    path: "/subscription",
    name: "Subscription",
    icon: creditCardIcon,
  },
  {
    path: "#",
    name: "Lists",
    icon: clipboardListIcon,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: userRoundIcon,
  },
  {
    path: "#",
    name: "More",
    icon: moreHorizontalIcon,
  },
];
