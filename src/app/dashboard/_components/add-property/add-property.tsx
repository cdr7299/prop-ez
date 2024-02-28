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
        <Button variant="default">Add Property</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
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
