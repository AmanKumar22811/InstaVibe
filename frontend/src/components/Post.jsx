import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setPosts, setSelectedPost } from "@/redux/postSlice";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`/api/v1/post/delete/${post?._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(`/api/v1/post/${post?._id}/${action}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        //update post
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-8 w-full max-w-sm mx-auto text-white bg-[#0c192c] rounded-lg shadow-lg transition-transform transform hover:scale-105">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.author?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <h1 className="font-semibold text-lg">{post.author?.username}</h1>
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
            {user && user?._id === post?.author._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-lg text-red-500 font-bold hover:text-red-600"
                onClick={deletePostHandler}
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Post Image */}
      <img
        src={post.image}
        alt="image cannot load"
        className="rounded-lg my-2 w-full aspect-square object-cover"
      />

      {/* Post Actions */}
      <div className="flex items-center justify-between px-4 my-2">
        <div className="flex items-center gap-4">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              className="text-red-600 cursor-pointer text-2xl"
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHandler}
              className="text-2xl cursor-pointer text-red-600 hover:text-red-700 transition-colors"
            />
          )}

          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
          />

          <Send className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors" />
        </div>
        <Bookmark className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors" />
      </div>
      <span className="font-medium block mb-2 px-4 text-gray-200">
        {postLike} likes
      </span>
      <p className="px-4">
        <span className="font-semibold mr-2 text-gray-300">
          {post.author?.username}
        </span>
        {post.caption}
      </p>

      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer text-gray-400 px-4 hover:underline hover:text-gray-300"
        >
          view all {comment.length} comments
        </span>
      )}

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
          <span
            onClick={commentHandler}
            className="text-cyan-500 cursor-pointer transition-transform transform hover:scale-125"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
