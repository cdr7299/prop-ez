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
import { type BrokerEntity } from "@prisma/client";
import { AddBrokerForm } from "./add-broker-form";
import { useState } from "react";

export function AddBroker({ brokers }: { brokers: BrokerEntity[] }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add New Broker</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Broker</DialogTitle>
          <DialogDescription>
            Add a new broker here, press submit to save it.
          </DialogDescription>
        </DialogHeader>
        <AddBrokerForm brokers={brokers} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
