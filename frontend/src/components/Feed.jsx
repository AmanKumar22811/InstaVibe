import React from "react";
import Posts from "./Posts";

const Feed = () => {
  return (
    <div className="flex-1 my-8 flex flex-col items-center pl-4 sm:pl-16 md:pl-[20%] lg:pl-[25%] xl:pl-[20%]">
      <Posts />
    </div>
  );
};

export default Feed;
