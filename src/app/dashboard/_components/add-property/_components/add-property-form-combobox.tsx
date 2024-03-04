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

export function AddPropertyCombobox({
  placeholder,
  data,
  value,
  setValue,
}: {
  placeholder: string;
  data: {
    id: string;
    name: string;
  }[];
  value?: string;
  setValue: (arg: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? data.find((item) => item.id === value)?.name : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" sideOffset={5}>
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
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
