import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonLoader = () => {
  return (
    <SkeletonTheme baseColor="#B0B6BB" highlightColor="#E1E8ED">
      <div className="p-5">
        <div className="flex items-center">
          <div className="">
            <Skeleton circle={true} width={40} height={40} />
          </div>
          <p className="ms-3">
            <Skeleton width={300} />
          </p>
          <p className="ms-2">
            <Skeleton width={100} />
          </p>
        </div>
        <div className="flex justify-center">
          <Skeleton count={3} width={440} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonLoader;
