import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const imageRef = useRef();
  return (
    <div className="flex max-w-2xl mx-auto pl-10 text-white">
      <section className="flex flex-col gap-6 w-full my-8">
        <h1 className="font-bold">Edit Profile</h1>
        <div className="flex items-center justify-between bg-gray-400 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar className="text-black ">
              <AvatarImage src={user} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center gap-3">
              <h1 className="font-bold  ">{user?.username}</h1>
              <span className="text-gray-100 text-sm">
                {user?.bio || "Bio here..."}
              </span>
            </div>
          </div>
          <input ref={imageRef} type="file" className="hidden" />
          <Button
            onClick={() => imageRef?.current.click()}
            className="bg-blue-500 hover:bg-blue-700"
          >
            Change photo
          </Button>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Bio</h1>
          <Textarea name="bio" className="focus-visible:ring-transparent" />
        </div>
        <div>
          <h1 className="font-bold mb-2">Gender</h1>
          <Select className="text-black">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
