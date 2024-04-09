"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type Customer } from "@prisma/client";
import DotLoader from "~/components/dot-loader";
import { AddCustomerFormSchema } from "./add-customer-form.types";
import { getDefaultValuesForAddCustomerForm } from "./_utils/add-customer-utils";

interface AddPropertyFormProps {
  customers?: Customer[];
  setOpen: (arg: boolean) => void;
  isEditMode?: boolean;
  editCustomerId?: string;
  onSubmit: (values: z.infer<typeof AddCustomerFormSchema>) => void;
  isLoading: boolean;
}

export function AddCustomerForm({
  customers,
  setOpen,
  isEditMode = false,
  editCustomerId,
  onSubmit,
  isLoading,
}: AddPropertyFormProps) {
  const form = useForm<z.infer<typeof AddCustomerFormSchema>>({
    resolver: zodResolver(AddCustomerFormSchema),
    defaultValues: () =>
      getDefaultValuesForAddCustomerForm(isEditMode, customers, editCustomerId),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 overflow-y-scroll px-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="eg. Akash Mehta" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-2">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="ex. 9999912345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ex. akash@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button type="submit" variant="default" size="lg" className="w-48">
            {!isLoading && "Submit"}
            {isLoading && <DotLoader />}
          </Button>
          {isEditMode && (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-48"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
