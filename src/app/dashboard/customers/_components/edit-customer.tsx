import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { AddCustomerForm } from "./add-customer/add-customer-form";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { type AddCustomerFormSchema } from "./add-customer/add-customer-form.types";
import { type z } from "zod";
import { type Customer } from "@prisma/client";

interface EditPropertyProps {
  editCustomerId: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
  customers: Customer[];
}

export function EditCustomer({
  editCustomerId,
  open,
  setOpen,
  customers,
}: EditPropertyProps) {
  const router = useRouter();
  const { isLoading, mutateAsync: mutateAsyncUpdate } =
    api.customers.update.useMutation({
      onError: () => {
        toast.error("Failed to update customer :(");
      },
      onSuccess: async (params) => {
        setOpen(false);
        toast.success(`Successfull updated ${params.name} customer!`);
        router.refresh();
      },
    });

  async function onSubmit(values: z.infer<typeof AddCustomerFormSchema>) {
    await mutateAsyncUpdate({ ...values, customerId: editCustomerId });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-full px-0 py-4 sm:h-auto sm:max-w-[50%] sm:py-6 xl:max-w-[40%] 2xl:max-w-[30%]">
        <DialogHeader className="px-4">
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>Press submit to save it.</DialogDescription>
        </DialogHeader>
        <AddCustomerForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          setOpen={setOpen}
          customers={customers}
          editCustomerId={editCustomerId}
          isEditMode
        />
      </DialogContent>
    </Dialog>
  );
}
