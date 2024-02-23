import Link from "next/link";

// import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";

// import { api } from "~/trpc/server";
import SignInButton from "~/app/_components/signInButton";
import { Button } from "~/components/ui/button";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex max-w-screen-2xl flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome to <span className="text-accent">Trakr.</span>
        </h1>

        <div className="flex flex-col items-center gap-6 p-6">
          <p className="text-center text-xl">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <div className="flex flex-col gap-8">
            {!session && <SignInButton />}
            {session && (
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
          </div>
        </div>

        {/* <CrudShowcase /> */}
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
