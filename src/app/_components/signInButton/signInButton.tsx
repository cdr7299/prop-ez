"use client";

import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

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
    <button
      onClick={handleAuth}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      {session ? "Sign Out" : "Sign in with Google"}
    </button>
  );
};

export default SignInButton;
