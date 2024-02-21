"use client";

import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

const SignInButton = ({ session }: { session: Session | null }) => {
  const handleAuth = async () => {
    console.log("yo", session);

    if (!session) {
      await signIn("google");
    } else {
      await signOut();
    }
  };
  return (
    <Button onClick={handleAuth} variant={"secondary"}>
      {session ? "Sign Out" : "Sign in with Google"}
    </Button>
  );
};

export default SignInButton;
