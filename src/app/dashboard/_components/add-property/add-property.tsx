"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { AddPropertyForm } from "./add-property-form";
import { useState } from "react";
import {
  type Locations,
  type Category,
  type BrokerEntity,
} from "@prisma/client";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export function AddProperty({
  categories,
  locations,
  brokers,
}: {
  categories: Category[];
  locations: Locations[];
  brokers: BrokerEntity[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className=" items-center gap-2">
          {" "}
          <PlusCircledIcon />
          Add Property
        </Button>
      </DialogTrigger>
      <DialogContent className="px-2 py-6 sm:max-w-[70%] sm:px-4 sm:py-6">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>
            Add a new property here, press submit to save it.
          </DialogDescription>
        </DialogHeader>
        <AddPropertyForm
          categories={categories}
          locations={locations}
          brokers={brokers}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
