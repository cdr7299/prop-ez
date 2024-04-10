"use client";

import * as React from "react";
import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { type PropertyItem } from "@prisma/client";
import { api } from "~/trpc/react";
import { type CustomerWithInterestedProperties } from "~/server/types/customer.types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AddInterestedCustomerCombobox({
  placeholder,
  data,
  property,
}: {
  placeholder: string;
  data: CustomerWithInterestedProperties[];
  value?: string;
  property: PropertyItem | null;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { mutateAsync } = api.customers.updateInterestedProperties.useMutation({
    onError: () => {
      toast.error("Failed to add interested customer :(");
    },
    onSuccess: async (params) => {
      setOpen(false);
      toast.success(
        `Successfull added ${params.name} as an interested customer!`,
      );
      router.refresh();
    },
  });

  const onSelectCustomer = async (value: string) => {
    await mutateAsync({
      propertyId: property?.id ?? "",
      customerId: value,
    });
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0" sideOffset={5}>
        <Command
          filter={(value, search) => {
            const matchingRows = data.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase()),
            );
            if (matchingRows.find((item) => item.id === value)) return 1;
            return 0;
          }}
        >
          <ScrollArea className="h-52 w-full">
            <CommandInput
              placeholder={placeholder}
              className=" !sticky !top-0"
            />
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup accessKey="name">
              {data.map((customer) => {
                // TODO, BAD CODE, FIX IT
                const isInterestedInProperties =
                  customer.isInterestedInBuying?.map(
                    (property) => property?.id,
                  );
                return (
                  <CommandItem
                    key={customer.id}
                    value={customer.id}
                    onSelect={(currentValue) => {
                      void onSelectCustomer(currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        isInterestedInProperties.includes(property?.id ?? "")
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {customer.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
