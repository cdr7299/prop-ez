"use client";

import { type Table } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { DataTableViewOptions } from "./customers-table-view-options";

import { useState } from "react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { customerSchema } from "../../data/schema";
import AlertDialogDeleteCustomer from "../alert-dialog-delete-customer";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const selectedRows = table.getSelectedRowModel().flatRows;

  const { mutateAsync } = api.customers.deleteMany.useMutation({
    onSuccess: (params) => {
      toast.success(`Succesfully deleted ${params.count} customers`);
      router.refresh();
      table.resetRowSelection();
    },
  });

  const onDeleteMultiple = async () => {
    const customerIds = selectedRows.map(
      (row) => customerSchema.parse(row.original).id,
    );
    await mutateAsync(customerIds);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center space-x-2 space-y-2 sm:flex-nowrap">
        <Input
          placeholder="Search Customers by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center gap-2">
        {selectedRows.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="h-8 lg:flex"
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
      <AlertDialogDeleteCustomer
        open={open}
        setOpen={setOpen}
        isDeleting={false}
        onDelete={onDeleteMultiple}
        count={selectedRows.length}
      />
    </div>
  );
}
