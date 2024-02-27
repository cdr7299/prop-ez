/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { type PropertyItem } from "../../data/schema";

export const columns: ColumnDef<PropertyItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div className="w-full">{row.getValue("location")}</div>,
    filterFn: (row, id, value: string) => {
      // should infer value : string
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => (
      <div className="flex w-full gap-1">
        <Badge variant="default">{row.original.category}</Badge>
        {row.getValue("address")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumSignificantDigits: 3,
        }).format(row.getValue("price"))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "pricePerSqFt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price (Sq Ft.)" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumSignificantDigits: 1,
        }).format(row.getValue("pricePerSqFt"))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <div className="w-full">{row.getValue("category")}</div>,
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "area",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Area(Sq Ft.)" />
    ),
    cell: ({ row }) => (
      <div className="w-full">{Number(row.getValue("area")).toFixed(2)}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Length" />
    ),
    cell: ({ row }) => (
      <div className="w-full">{Number(row.getValue("length")).toFixed(1)}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "width",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Width" />
    ),
    cell: ({ row }) => (
      <div className="w-full">{Number(row.getValue("width")).toFixed(1)}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "floors",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Floors" />
    ),
    cell: ({ row }) => <div className="w-full">{row.getValue("floors")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "brokerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Broker Name" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue("brokerName")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[150px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status"),
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority"),
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} propertyId={row.original.id} />
    ),
  },
];
