"use client";

import { DotsHorizontalIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { type Table, type Row } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { propertySchema } from "../../data/schema";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  type PropertyStatus,
  PropertyStatusOptions,
} from "~/app/_types/properties";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  propertyId: string;
  table: Table<TData>;
}

export function DataTableRowActions<TData>({
  row,
  propertyId,
  table,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const propertyData = propertySchema.parse(row.original);
  const { mutateAsync } = api.properties.delete.useMutation({
    onSuccess: (params) => {
      toast.success(`Deleted Property ${params.title}`);
      router.refresh();
    },
  });
  const { mutateAsync: updateStatus } = api.properties.updateStatus.useMutation(
    {
      onSuccess: (params) => {
        toast.success(`Updated Status for ${params.title}`);
        router.refresh();
      },
    },
  );

  const onChangeStatus = async (value: string) => {
    await updateStatus({
      propertyId: propertyId,
      status: value as PropertyStatus,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" className="!h-6 !py-0 px-2">
        <OpenInNewWindowIcon />
      </Button>
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
              table.options.meta?.editProperty(propertyId);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={propertyData.status}
                onValueChange={onChangeStatus}
              >
                {PropertyStatusOptions.map((label) => (
                  <DropdownMenuRadioItem key={label.label} value={label.value}>
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await mutateAsync({ propertyId: propertyId });
            }}
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
