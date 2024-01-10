export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string[];
  stripePriceId: string;
  price: number;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "pro",
    name: "Pro",
    description: [
      "Blue Tick",
      "Unlimited Tweets",
      "Image Uploading",
      "Video Uploading",
      "Profile Updation",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "",
    price: 2000,
  },
  {
    id: "premium",
    name: "Premium",
    description: [
      "Blue Tick",
      "Unlimited Tweets",
      "Image Uploading",
      "Video Uploading",
      "Profile Updation",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID ?? "",
    price: 200,
  },
];
