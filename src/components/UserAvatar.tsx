import React from "react";

type UserName = {
  userName: string;
};

const UserAvatar = ({ userName }: UserName) => {
  return (
    <div className="rounded-full bg-blue-300 w-10 h-10 flex items-center justify-center">
      <p className="text-white font-bold text-xl uppercase">
        {userName?.slice(0, 1)}
      </p>
    </div>
  );
};

export default UserAvatar;
