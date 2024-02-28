"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type BrokerEntity } from "@prisma/client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DotLoader from "~/components/dot-loader";

const formSchema = z.object({
  name: z.string().min(1),
  phoneNumber: z
    .string()
    .min(10, "Phone number should be at least 10 digits")
    .max(10, "Phone number should be at most 10 digits")
    .optional()
    .or(z.literal("")),
});

export function AddBrokerForm({
  brokers,
  setOpen,
  isEditMode = false,
  editBrokerId,
}: {
  brokers: BrokerEntity[];
  setOpen: (arg: boolean) => void;
  isEditMode?: boolean;
  editBrokerId?: BrokerEntity["id"];
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      if (isEditMode) {
        const broker = brokers.find((b) => b.id === editBrokerId);
        return {
          name: broker?.name ?? "",
          phoneNumber: broker?.phoneNumber ?? "",
        };
      }
      return {} as z.infer<typeof formSchema>;
    },
  });

  const { isLoading, mutateAsync } = api.brokers.create.useMutation({
    onError: () => {
      toast.error("Failed to add broker :(");
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Successfull added new broker!");
      router.refresh();
    },
  });
  const { isLoading: isUpdating, mutateAsync: mutateAsyncUpdate } =
    api.brokers.update.useMutation({
      onError: () => {
        toast.error("Failed to update broker :(");
      },
      onSuccess: (params) => {
        setOpen(false);
        toast.success(`Updated ${params.name} !`);
        router.refresh();
      },
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode) {
      await mutateAsyncUpdate({ ...values, brokerId: editBrokerId ?? "" });
    } else await mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Broker Name *</FormLabel>
              <FormControl>
                <Input placeholder="ex. Ashish Sharma" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="ex. 9999912345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="default" size="lg">
          {!isLoading && !isUpdating && "Submit"}
          {(isLoading || isUpdating) && <DotLoader />}
        </Button>
      </form>
    </Form>
  );
}
