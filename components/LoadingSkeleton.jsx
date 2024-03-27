import React from "react";

const LoadingSkeleton = () => {
    return (
      <div className="h-full w-full bg-neutral-900 flex flex-col items-center justify-center gap-4 rounded-md transition duration-500">
        <div className="flex items-center justify-center gap-4">
          <div className=" animate-[scale_1s_200ms_ease-in-out_infinite] w-2 h-2 rounded-full bg-neutral-400"></div>
          <div className="animate-[scale_1s_600ms_ease-in-out_infinite]  w-2 h-2 rounded-full bg-neutral-400"></div>
          <div className="animate-[scale_1s_800ms_ease-in-out_infinite]  w-2 h-2 rounded-full bg-neutral-400"></div>
        </div>
      </div>
    );
};

export default LoadingSkeleton;
