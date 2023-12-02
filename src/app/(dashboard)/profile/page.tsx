import React from "react";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileBio from "./_components/ProfileBio";

const Profile = () => {
  return (
    <div className="w-[600px] ms-16">
      <ProfileHeader />
      <ProfileBio />
    </div>
  );
};

export default Profile;
