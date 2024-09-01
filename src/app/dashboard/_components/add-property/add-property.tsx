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
import { type Locations, type BrokerEntity } from "@prisma/client";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { type CategoryWithConfig } from "~/server/types/categories.types";
import { type AddPropertyFormSchema } from "./add-property-form.types";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AddProperty({
  categories,
  locations,
  brokers,
}: {
  categories: CategoryWithConfig[];
  locations: Locations[];
  brokers: BrokerEntity[];
}) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const { isLoading, mutateAsync } = api.properties.create.useMutation({
    onError: () => {
      toast.error("Failed to add property :(");
    },
    onSuccess: async () => {
      setOpen(false);
      toast.success("Successfull added new property!");
      router.refresh();
    },
  });
  async function onSubmit(values: z.infer<typeof AddPropertyFormSchema>) {
    await mutateAsync(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className=" items-center gap-2">
          <PlusCircledIcon />
          Add Property
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full max-h-full flex-col px-0 py-2 sm:h-auto sm:max-w-[80%] sm:py-4 xl:max-w-[70%] 2xl:max-w-[50%]">
        <DialogHeader className="h-fit justify-around gap-2 !space-y-0 border-b-[1px] border-b-primary px-4 py-2 sm:border-b-0 sm:py-0">
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
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
