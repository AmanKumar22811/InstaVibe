import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";

const Post = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  return (
    <div className="my-8 w-full max-w-sm mx-auto text-white bg-[#0c192c] rounded-lg shadow-lg transition-transform transform hover:scale-105">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-semibold text-lg">UserName</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-center ">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-red-500 font-bold text-lg hover:text-red-600 "
            >
              Unfollow
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-lg font-semibold hover:text-gray-300"
            >
              Add to favorites
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-lg text-red-500 font-bold hover:text-red-600"
            >
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Post Image */}
      <img
        src="https://images.unsplash.com/photo-1725449670931-b53a7cb689b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D"
        alt="image cannot load"
        className="rounded-lg my-2 w-full aspect-square object-cover"
      />

      {/* Post Actions */}
      <div className="flex items-center justify-between px-4 my-2">
        <div className="flex items-center gap-4">
          <FaRegHeart className="text-2xl cursor-pointer text-red-600 hover:text-red-700 transition-colors" />
          <MessageCircle
            onClick={() => setOpen(true)}
            className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
          />
          <Send className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors" />
        </div>
        <Bookmark className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors" />
      </div>
      <span className="font-medium block mb-2 px-4 text-gray-200">
        1k Likes
      </span>
      <p className="px-4">
        <span className="font-semibold mr-2 text-gray-300">UserName</span>
      </p>
      <span
        onClick={() => setOpen(true)}
        className="cursor-pointer text-gray-400 px-4 hover:underline hover:text-gray-300"
      >
        View all 10 comments
      </span>
      <CommentDialog open={open} setOpen={setOpen} />

      {/* Comment Input */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-gray-700 mt-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="w-full bg-[#1a273f] p-2 rounded-lg text-gray-300 outline-none placeholder-gray-500 focus:ring focus:ring-blue-300"
        />
        {text && (
          <span className="text-cyan-500 cursor-pointer transition-transform transform hover:scale-125">
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
