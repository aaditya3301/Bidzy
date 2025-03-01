"use client";

import React from "react";
import { LoginFormDemo } from "@/components/sections/loginform";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-black py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <LoginFormDemo />
        </div>
      </div>
    </>
  );
}
