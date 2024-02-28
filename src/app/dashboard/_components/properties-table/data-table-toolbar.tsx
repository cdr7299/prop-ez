"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { type Category, type Locations } from "@prisma/client";
import AlertDialogDeleteProperty from "../alert-dialog-delete-property";
import { useState } from "react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  locations: Locations[];
  categories: Category[];
}

export function DataTableToolbar<TData>({
  table,
  locations,
  categories,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const router = useRouter();
  const locationsOptions = locations?.map((item) => ({
    label: item.name,
    value: item.name,
  }));
  const categoryOptions = categories?.map((item) => ({
    label: item.name,
    value: item.name,
  }));
  const [open, setOpen] = useState<boolean>(false);
  const selectedRows = table.getSelectedRowModel().flatRows;
  console.log(selectedRows);
  const { mutateAsync } = api.properties.deleteMany.useMutation({
    onSuccess: (params) => {
      toast.success(`Succesfully deleted ${params.count} properties`);
      router.refresh();
      table.resetRowSelection();
    },
  });

  const onDeleteMultiple = async () => {
    // @ts-expect-error tanstack not exposing types correctly
    const propertyIds = selectedRows.map((row) => row.original.id as string);
    await mutateAsync(propertyIds);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Properties by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("location") && (
          <DataTableFacetedFilter
            column={table.getColumn("location")}
            title="Locations"
            options={locationsOptions || []}
          />
        )}
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={categoryOptions || []}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
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
            Delete Multiple items
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
      <AlertDialogDeleteProperty
        open={open}
        setOpen={setOpen}
        isDeleting={false}
        onDelete={onDeleteMultiple}
        count={selectedRows.length}
      />
    </div>
  );
}
