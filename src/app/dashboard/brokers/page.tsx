import { api } from "~/trpc/server";
import { DataTable } from "./brokers-table/data-table";
import { columns } from "./brokers-table/columns";
import { AddBroker } from "./add-broker/add-broker";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const brokers = await api.brokers.list.query();

  return (
    <div className="flex size-full max-w-screen-2xl flex-col gap-8 py-4">
      <Link
        href="/dashboard"
        className="text-normal flex w-full items-center gap-2 self-start font-extrabold underline-offset-4 hover:underline"
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
      <DataTable columns={columns} data={brokers} />
    </div>
  );
}
