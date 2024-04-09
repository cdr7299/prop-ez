import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { type Metadata } from "next";
import { api } from "~/trpc/server";
import { CustomersTable } from "./_components/customers-table/customers-table";
import { columns } from "./_components/customers-table/columns";
import { AddCustomer } from "./_components/add-customer/add-customer";

export const metadata: Metadata = {
  title: "Customers",
  description: "All saved customers",
};

export default async function Page() {
  const customers = await api.customers.list.query();
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
          <h1 className="text-xl font-extrabold">Customers</h1>
          <h3 className="text-sm">
            Here you can add, edit or modify saved customers
          </h3>
        </div>
        <AddCustomer />
      </div>
      <CustomersTable
        columns={columns}
        data={customers}
        customers={customers}
      />
    </div>
  );
}
