import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { AddPropertyForm } from "./add-property/add-property-form";
import {
  type Locations,
  type BrokerEntity,
  type PropertyItem,
} from "@prisma/client";
import { type CategoryWithConfig } from "~/server/types/categories.types";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { type AddPropertyFormSchema } from "./add-property/add-property-form.types";
import { type z } from "zod";

interface EditPropertyProps {
  categories: CategoryWithConfig[];
  locations: Locations[];
  brokers: BrokerEntity[];
  properties: Array<PropertyItem>;
  editPropertyId: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export function EditProperty({
  categories,
  locations,
  brokers,
  properties,
  editPropertyId,
  open,
  setOpen,
}: EditPropertyProps) {
  const router = useRouter();
  const { isLoading, mutateAsync: mutateAsyncUpdate } =
    api.properties.update.useMutation({
      onError: () => {
        toast.error("Failed to update property :(");
      },
      onSuccess: async (params) => {
        setOpen(false);
        toast.success(`Successfull updated ${params.title} property!`);
        router.refresh();
      },
    });

  async function onSubmit(values: z.infer<typeof AddPropertyFormSchema>) {
    await mutateAsyncUpdate({ ...values, propertyId: editPropertyId });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex h-full max-h-full flex-col px-0 py-2 sm:h-auto sm:max-w-[80%] sm:py-4 xl:max-w-[70%] 2xl:max-w-[50%]">
        <DialogHeader className="h-fit justify-around gap-2 !space-y-0 border-b-[1px] border-b-primary px-4 py-2 sm:border-b-0 sm:py-0">
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>Press submit to save it.</DialogDescription>
        </DialogHeader>
        <AddPropertyForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          categories={categories}
          locations={locations}
          brokers={brokers}
          setOpen={setOpen}
          properties={properties}
          editPropertyId={editPropertyId}
          isEditMode
        />
      </DialogContent>
    </Dialog>
  );
}
