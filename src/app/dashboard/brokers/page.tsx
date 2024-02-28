import { api } from "~/trpc/server";
import { DataTable } from "./brokers-table/data-table";
import { columns } from "./brokers-table/columns";
import { AddBroker } from "./add-broker/add-broker";

export default async function Page() {
  const brokers = await api.brokers.list.query();

  return (
    <div className="flex size-full max-w-screen-2xl flex-col gap-8 py-8">
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
