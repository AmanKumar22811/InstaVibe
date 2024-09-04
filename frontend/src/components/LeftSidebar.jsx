import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";

const sidebarItems = [
  { icon: <Home />, text: "Home" },
  { icon: <Search />, text: "Search" },
  { icon: <TrendingUp />, text: "Explore" },
  { icon: <MessageCircle />, text: "Messages" },
  { icon: <Heart className="w-5 h-5" />, text: "Notifications" },
  { icon: <PlusSquare />, text: "Create" },
  {
    icon: (
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
    ),
    text: "Profile",
  },
  { icon: <LogOut />, text: "Logout" },
];

const LeftSidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    }
  };

  return (
    <div className="fixed top-0 z-10 left-0 px-4 lg:w-[16%] md:w-[20%] sm:w-[25%] w-[30%] h-screen bg-gray-900 text-white border-r border-gray-700">
      <div className="flex flex-col">
        <div>
          {sidebarItems.map((item, index) => (
            <div
              onClick={() => sidebarHandler(item.text)}
              key={index}
              className="flex items-center gap-3 relative hover:bg-cyan-300 hover:font-semibold  hover:text-pink-500 cursor-pointer rounded-lg p-3 my-3 transition-transform duration-200 ease-in-out transform hover:scale-110"
            >
              {item.icon}
              <span className="hidden sm:inline">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
