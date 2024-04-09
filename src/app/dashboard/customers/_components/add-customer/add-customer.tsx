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
import { AddCustomerForm } from "./add-customer-form";
import { useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { type AddCustomerFormSchema } from "./add-customer-form.types";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AddCustomer() {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const { isLoading, mutateAsync } = api.customers.create.useMutation({
    onError: () => {
      toast.error("Failed to add customer :(");
    },
    onSuccess: async () => {
      setOpen(false);
      toast.success("Successfull added new customer!");
      router.refresh();
    },
  });
  async function onSubmit(values: z.infer<typeof AddCustomerFormSchema>) {
    await mutateAsync(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className=" items-center gap-2">
          <PlusCircledIcon />
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full px-0 py-4 sm:h-auto sm:max-w-[50%] sm:py-6 xl:max-w-[40%] 2xl:max-w-[30%]">
        <DialogHeader className="justify-around gap-2 !space-y-0 border-b-[1px] border-b-primary px-4 py-2 sm:border-b-0 sm:py-0">
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Add a new customer here, press submit to save it.
          </DialogDescription>
        </DialogHeader>
        <AddCustomerForm
          setOpen={setOpen}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
