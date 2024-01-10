import React from "react";
import { PulseLoader } from "react-spinners";

const FullScreenLoader = () => {
  return (
    <div className="fixed right-0 top-0 z-10 w-[100vw] h-[100vh] bg-[#80808094]">
      <div className="relative flex justify-center h-full items-center ">
        <PulseLoader size={20} color="#1DA1F2" />
      </div>
    </div>
  );
};

export default FullScreenLoader;
