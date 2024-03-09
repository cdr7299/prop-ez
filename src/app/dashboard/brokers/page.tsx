import { api } from "~/trpc/server";
import { DataTable } from "./brokers-table/data-table";
import { columns } from "./brokers-table/columns";
import { AddBroker } from "./add-broker";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Brokers",
  description: "All saved brokers",
};

export default async function Page() {
  const brokers = await api.brokers.list.query();

  return (
    <div className="flex size-full max-w-screen-2xl flex-col gap-8 p-4">
      <Link
        href="/dashboard"
        className="flex w-full items-center gap-1 self-start text-xs font-bold underline-offset-4 hover:underline sm:gap-2 sm:text-sm"
      >
        <ArrowLeftIcon className="size-3" />
        Back
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-xl font-extrabold">Brokers</h1>
          <h3 className="text-sm">
            Here you can add, edit or modify saved brokers
          </h3>
        </div>
        <AddBroker brokers={brokers} />
      </div>
      <DataTable columns={columns} data={brokers} brokers={brokers} />
    </div>
  );
}
