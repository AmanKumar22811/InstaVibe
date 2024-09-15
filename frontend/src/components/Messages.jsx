import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import useGetAllMeassage from "@/hooks/useGetAllMeassage";

const Messages = ({ selectedUser }) => {
  useGetAllMeassage();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center ">
          <Avatar className="text-black">
            <AvatarImage src={selectedUser?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button className="h-8 my-2" variant="secondary">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {messages &&
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.senderId === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs break-words ${
                  msg.senderId === user?._id ? "bg-pink-500" : "bg-violet-700"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Messages;
