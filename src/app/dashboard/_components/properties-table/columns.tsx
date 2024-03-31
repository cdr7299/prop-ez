"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { type PropertyItem } from "../../data/schema";
import { getLocalDateTime } from "~/lib/date.utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export const columns: ColumnDef<PropertyItem>[] = [
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Added" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-56 items-center gap-4">
        <Badge variant="default" className="p- min-h-6 break-words">
          <span className="!text-xs">{row.original.category}</span>
        </Badge>
        {getLocalDateTime(row.getValue("createdAt"))}
      </div>
    ),

    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="max-w-32">{row.getValue("location")}</div>
    ),
    filterFn: (row, id, value: string) => {
      // should infer value : string
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-44 items-center gap-2">
        <span className="line-clamp-3 max-w-44 text-left">
          {row.getValue("address")}
        </span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex">
          <span className="line-clamp-2 block max-w-56 text-left">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
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
          maximumSignificantDigits: 10,
        }).format(row.getValue("price"))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "pricePerSqFt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
        titleHelper="(sq/ft)"
      />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumSignificantDigits: 6,
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div className="w-full">{row.getValue("status")}</div>,
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "area",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Area"
        titleHelper="(sq/ft)"
      />
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="block max-w-32 truncate text-left">
              {row.getValue("brokerName")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span className=""> {row.getValue("brokerName")}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "brokerContactNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Broker Contact No." />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">
        {row.getValue("brokerContactNumber")}
      </div>
    ),
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },

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
    cell: ({ row, table }) => (
      <DataTableRowActions
        row={row}
        propertyId={row.original.id}
        table={table}
      />
    ),
  },
];
