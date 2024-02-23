"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

const SignInButton = () => {
  const handleAuth = async () => {
    await signIn("google");
  };
  return (
    <Button onClick={handleAuth} variant="default">
      Sign in with Google
    </Button>
  );
};

export default SignInButton;
