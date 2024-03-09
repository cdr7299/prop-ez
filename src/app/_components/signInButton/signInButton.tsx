"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

const SignInOptions = () => {
  const handleAuth = async (provider: "google" | "email") => {
    await signIn(provider);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="font-bold">
        Choose your
        <span className="mx-1 text-accent">sign in </span>
        method
      </h3>
      <Button
        onClick={() => handleAuth("google")}
        variant="default"
        className="w-64"
      >
        Sign in with Google
      </Button>
      <Button
        disabled
        onClick={() => handleAuth("email")}
        variant="default"
        className="w-64"
      >
        Sign in with Email (coming soon)
      </Button>
    </div>
  );
};

export default SignInOptions;
