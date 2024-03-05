"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";

interface DataTableUnitsOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableUnitsOptions<TData>({
  table,
}: DataTableUnitsOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Switch Units
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Switch Units</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="capitalize"
          // checked={column.getIsVisible()}
          // onCheckedChange={(value) => column.toggleVisibility(!!value)}
        >
          Coming Soon!
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
