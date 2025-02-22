"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-zinc-900 mt-16">
      <h2 className="font-bold text-xl text-neutral-200">Welcome to Bidzy</h2>
      <p className="text-neutral-300 text-sm max-w-sm mt-2">
        Sign in to continue to your account
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-neutral-200">
              First name
            </Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              className="bg-zinc-800 border-zinc-700 text-neutral-200 placeholder:text-neutral-500"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-neutral-200">
              Last name
            </Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              className="bg-zinc-800 border-zinc-700 text-neutral-200 placeholder:text-neutral-500"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-neutral-200">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            className="bg-zinc-800 border-zinc-700 text-neutral-200 placeholder:text-neutral-500"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password" className="text-neutral-200">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            className="bg-zinc-800 border-zinc-700 text-neutral-200 placeholder:text-neutral-500"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-zinc-800 to-zinc-900 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full rounded-md h-10 font-medium bg-zinc-800 text-neutral-200"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4" />
            <span className="text-sm">Continue with GitHub</span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full rounded-md h-10 font-medium bg-zinc-800 text-neutral-200"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4" />
            <span className="text-sm">Continue with Google</span>
            <BottomGradient />
          </button>
        </div>

        <p className="text-center text-sm text-neutral-400 mt-4">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:text-blue-500">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
