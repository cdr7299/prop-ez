import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <main className="mt-[4.5rem] min-h-[calc(100vh-4.5rem)] w-full">
      {session ? (
        children
      ) : (
        <div className="mt-[4.5rem] flex size-full min-h-[calc(100vh-4.5rem)] items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <div className="font-bold">
              You are not authorized to view this page.
            </div>
            <Link
              className="font-bold1 mt-4 rounded bg-accent p-2 px-4 text-white"
              href="/"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
