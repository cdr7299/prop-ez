import { type Session } from "next-auth";
import { UserNav } from "./components/user-nav";
import { ThemeToggle } from "./components/theme-toggle";
import Link from "next/link";
import { Button } from "../ui/button";
import SignInButton from "~/app/_components/signInButton";

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <div className="fixed top-0 z-50 flex h-[4.5rem] w-full items-center justify-center border-b-[1px] border-primary px-4 text-primary-foreground backdrop-blur-3xl">
      <div className="flex w-full max-w-screen-2xl items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-extrabold tracking-tight">PropEZ</h1>
        </Link>
        <div className="flex items-center gap-4">
          {session && <UserNav session={session} />}
          {!session && (
            <div className="flex basis-1/2 flex-col items-center gap-4">
              <SignInButton />
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
