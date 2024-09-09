import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="my-2 p-1">
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={comment?.author?.profilePicture} className="size-10 rounded-full"/>

          <AvatarFallback className="bg-slate-100 rounded-full p-2">CN</AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-sm">
          {comment?.author?.username} <span className="font-normal pl-1">{comment?.text}</span>
        </h1>
      </div>
    </div>
  );
};

export default Comment;
