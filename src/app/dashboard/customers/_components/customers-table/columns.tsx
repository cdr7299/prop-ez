/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "./customers-table-column-header";
import { DataTableRowActions } from "./customers-table-row-actions";
// import { type BrokerSchema } from "../data/schema";
import { type CustomerSchema } from "../../data/schema";

export const columns: ColumnDef<CustomerSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="w-6">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="!m-0 flex items-center"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-6">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="!m-0 flex items-center"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[250px]">{row.getValue("name")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact No." />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">
        {row.getValue("phoneNumber")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email." />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue("email")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row, table }) => (
      <DataTableRowActions customerId={row.original.id} table={table} />
    ),
  },
];
