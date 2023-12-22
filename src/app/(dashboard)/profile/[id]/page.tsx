import { serverTrpc } from "@/trpc/trpc-caller";
import React from "react";
import ProfileHeader from "../_components/ProfileHeader";
import ProfileBio from "./_components/ProfileBio";

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await serverTrpc.getUserById(params.id);

  return (
    <div className="w-[600px] md:w-full h-[100vh] md:ms-0 ms-16">
      <ProfileHeader tweets={data.tweets.length} userName={data.name} />
      <ProfileBio
        userId={params.id}
        image={data.image ?? ""}
        name={data.name}
      />
    </div>
  );
};

export default Page;
