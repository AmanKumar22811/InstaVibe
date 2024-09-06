import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    
  };
  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-4xl w-full p-0 flex flex-col"
        onInteractOutside={() => setOpen(false)}
      >
        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-1/2 w-full">
            <img
              src="https://images.unsplash.com/photo-1725449670931-b53a7cb689b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full object-cover rounded-lg"
              alt="post"
            />
          </div>

          {/* Comments Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-sm">username</Link>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>

                <DialogContent className="flex flex-col items-center text-center">
                  <div className="cursor-pointer w-full text-red-600 font-bold">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full">Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex-1 overflow-y-auto max-h-96 mt-4">comments</div>

            <div className="flex items-center gap-3 mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full outline-none border border-gray-300 p-2 rounded"
                onChange={changeEventHandler}
                value={text}
              />
              <Button
                onClick={sendMessageHandler}
                disabled={!text.trim()}
                variant="outline"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
