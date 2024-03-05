import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full items-center justify-center">
      <Tabs
        defaultValue="Locations"
        orientation="vertical"
        className="size-full max-w-screen-2xl sm:flex"
      >
        <TabsList className="mt-5 flex flex-col gap-2 rounded-none border-x-[1px] !bg-inherit py-2 sm:mt-0 sm:min-h-[calc(100vh-4.5rem)] sm:flex-col sm:justify-start sm:gap-4 sm:px-2 sm:py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 self-start text-xs font-bold underline-offset-4 hover:underline sm:gap-2 sm:text-sm"
          >
            <ArrowLeftIcon className="size-3" />
            Back
          </Link>
          <div className="flex w-full gap-6 sm:flex-col sm:gap-4">
            <TabsTrigger value="Locations">Manage Locations</TabsTrigger>
            <TabsTrigger value="Categories">Manage Categories</TabsTrigger>
          </div>
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
}
