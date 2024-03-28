/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import {
  type PropertyItem,
  type BrokerEntity,
  type Locations,
} from "@prisma/client";
import { EditProperty } from "../edit-property";
import { Button } from "~/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { type CategoryWithConfig } from "~/server/types/categories.types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  locations: Locations[];
  categories: CategoryWithConfig[];
  brokers: BrokerEntity[];
  properties: PropertyItem[];
}

export function PropertiesTable<TData, TValue>({
  columns,
  data,
  locations,
  categories,
  brokers,
  properties,
}: DataTableProps<TData, TValue>) {
  // console.log(data[0]);
  const [open, setOpen] = useState<boolean>(false);
  const [editPropertyId, setEditPropertyId] = useState<string>("");

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    category: false,
    length: false,
    width: false,
    brokerContactNumber: false,
    floors: false,
    status: false,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      editProperty(propertyId) {
        setOpen(true);
        setEditPropertyId(propertyId);
      },
      editBroker() {
        return;
      },
    },
  });

  // useEffect(() => {
  // create a user preference if there's none
  // if (!userPreference) {
  //   console.log("user pref created");
  //   async function createUserPreference() {
  //     const currentVisibleColumnNames = table
  //       .getVisibleFlatColumns()
  //       .map((item) => item.id);
  //     // await mutateAsync({
  //     //   propertyTableColumns: table.getVisibleFlatColumns(),
  //     // });
  //   }
  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   createUserPreference();
  // } else {
  //   console.log("user pref exists", userPreference.propertyTableColumns);
  //   const payload = {} as VisibilityState;
  //   // userPreference?.propertyTableColumns?.forEach((curr: string) => {
  //   //   payload[curr] = true;
  //   // });
  //   // table.toggleAllColumnsVisible(false);
  //   // setColumnVisibility(payload);
  //   console.log("CHECK ME", payload);
  // }
  // }, [userPreference, mutateAsync]);

  // useEffect(() => {
  //   async function updatePropertyTableColumnVisibility() {
  //     const currentVisibleColumnNames = table
  //       .getVisibleFlatColumns()
  //       .map((item) => item.id)
  //       .filter((item) => item !== "actions" && item !== "select");
  //     console.log(currentVisibleColumnNames);
  //     await updatePropertyTableColumnVisibilityById({
  //       id: userPreference.id,
  //       propertyTableColumns: currentVisibleColumnNames,
  //     });
  //   }
  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   updatePropertyTableColumnVisibility();
  // }, [columnVisibility]);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        locations={locations}
        categories={categories}
        brokers={brokers}
      />
      <div className="rounded-md border border-primary">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-4 py-4">
                    No results. Try adding a new property.
                    <Button className="w-fit gap-2">
                      <PlusCircledIcon className="size-4" />
                      Add Property
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <EditProperty
        categories={categories}
        locations={locations}
        brokers={brokers}
        properties={properties}
        editPropertyId={editPropertyId}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
