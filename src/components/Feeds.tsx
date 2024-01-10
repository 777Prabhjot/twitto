"use client";
import { trpc } from "@/app/_trpc/client";
import Tweet from "./Tweet";
import SkeletonLoader from "./SkeletonLoader";

type PropsType = {
  isSubscribed?: boolean;
  isCanceled?: boolean;
};

const Feeds = ({ isSubscribed, isCanceled }: PropsType) => {
  const { data, isLoading } = trpc.allTweets.useQuery();
  return (
    <>
      {isLoading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : (
        <div>
          {data?.tweets?.map((tweet) => {
            return (
              <Tweet
                key={tweet.id}
                tweetId={tweet.id!}
                tweetBy={tweet.userId!}
                isSubscribed={isSubscribed as boolean}
                isCanceled={isCanceled as boolean}
                image={tweet.image! && tweet.image}
                video={tweet.video! && tweet.video}
                currentUserId={data.currentUserId!}
                userImage={tweet.User?.image!}
                userName={tweet.User?.name!}
                userEmail={tweet.User?.email!}
                content={tweet.content!}
                tweetLikes={tweet.likes!}
                createdAt={tweet.createdAt}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Feeds;
