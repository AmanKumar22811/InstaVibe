import React, { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import "../App.css";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      const res = await axios.post("/api/v1/user/register", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <AnimatedBackground />
      <form
        onSubmit={signupHandler}
        className="animated-border relative z-10 bg-white shadow-lg rounded-lg flex flex-col gap-6 p-8 w-full max-w-md"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">LOGO</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Sign up to see photos & videos from your friends
          </p>
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 sm:text-base">
            Username
          </Label>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 sm:text-base">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 sm:text-base">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
