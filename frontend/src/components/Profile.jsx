import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign } from "lucide-react";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const { userProfile } = useSelector((store) => store.auth);
  const isLoggedInUserProfile = true;
  const isFollowing = false;
  return (
    <div className="flex max-w-4xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src={userProfile?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5 text-white">
              <div className="flex items-center gap-2">
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Button
                      variant="secondary"
                      className=" hover:bg-cyan-300 h-8  hover:text-white"
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:bg-cyan-300 h-8  hover:text-white"
                    >
                      View Archieve
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:bg-cyan-300 h-8  hover:text-white"
                    >
                      Ad Tools
                    </Button>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button
                      variant="secondary"
                      className="hover:bg-blue-400 h-8 hover:text-white"
                    >
                      Unfollow
                    </Button>

                    <Button
                      variant="secondary"
                      className="hover:bg-blue-400 h-8 hover:text-white"
                    >
                      Message
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="secondary"
                    className="hover:bg-blue-400 h-8 hover:text-white"
                  >
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold p-1">
                    {userProfile?.posts.length}
                  </span>
                  posts
                </p>
                <p>
                  <span className="font-semibold p-1">
                    {userProfile?.followers.length}
                  </span>
                  followers
                </p>
                <p>
                  <span className="font-semibold p-1">
                    {userProfile?.following.length}
                  </span>
                  following
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  {userProfile?.bio || "bio here ... "}
                </span>
                <Badge className="w-fit " variant="secondary">
                  <AtSign />
                  <span className="pl-1">{userProfile?.username}</span>
                </Badge>
                <span>💻 Learn coding</span>
                <span>👨‍💻 Turning code into fun </span>
                <span>👨 DM for connect</span>
              </div>
            </div>
          </section>
        </div>
        <div className="border-t border-t-slate-200 text-white">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span className="py-3 cursor-pointer">POSTS</span>
            <span className="py-3 cursor-pointer">SAVED</span>
            <span className="py-3 cursor-pointer">TAGS</span>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
