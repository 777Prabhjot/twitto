"use client";
import { trpc } from "@/app/_trpc/client";
import Tweet from "./Tweet";

const Feeds = () => {
  const { data } = trpc.allTweets.useQuery();
  return (
    <div>
      {data &&
        data?.map((tweet) => {
          return (
            <Tweet
              key={tweet.id}
              userImage={tweet.User?.image!}
              userName={tweet.User?.name!}
              userEmail={tweet.User?.email!}
            />
          );
        })}
      ;
    </div>
  );
};

export default Feeds;
