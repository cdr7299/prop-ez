"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "sonner";

import { type Table } from "@tanstack/react-table";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  customerId: string;
  table: Table<TData>;
}

export function DataTableRowActions<TData>({
  customerId,
  table,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  const { mutateAsync } = api.customers.delete.useMutation({
    onSuccess: (params) => {
      toast.success(`Deleted Customer ${params.name}`);
      router.refresh();
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            table.options.meta?.editCustomer(customerId);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await mutateAsync({ customerId: customerId });
          }}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
