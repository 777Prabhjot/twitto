"use client";
import { trpc } from "@/app/_trpc/client";
import Tweet from "./Tweet";
import SkeletonLoader from "./SkeletonLoader";

const Feeds = () => {
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
                currentUserId={data.currentUserId!}
                userImage={tweet.User?.image!}
                userName={tweet.User?.name!}
                userEmail={tweet.User?.email!}
                content={tweet.content!}
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
