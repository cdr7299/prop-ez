"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

const SignInOptions = () => {
  const handleAuth = async (provider: "google" | "email") => {
    console.log(provider);
    await signIn(provider);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* <h3 className="font-bold">
        Choose your
        <span className="mx-1 text-accent">sign in </span>
        method
      </h3> */}
      <Button
        onClick={() => handleAuth("google")}
        variant="default"
        className="w-fit"
      >
        Sign in
      </Button>
      {/* <Button
        onClick={() => handleAuth("email")}
        variant="default"
        className="w-64"
      >
        Other sign in options
      </Button> */}
    </div>
  );
};

export default SignInOptions;
