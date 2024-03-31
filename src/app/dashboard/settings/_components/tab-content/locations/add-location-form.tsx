"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DotLoader from "~/components/dot-loader";

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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  defaultFloors: z.string().optional(),
});

export function AddLocationForm({
  onSubmit,
  isAdding,
  data,
  editDataId,
  isEditMode,
}: {
  onSubmit: (args: { name: string }) => void;
  isAdding: boolean;
  data?: {
    id: string;
    name: string;
  }[];
  editDataId?: string;
  isEditMode?: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    mode: "onChange",
    defaultValues: async () => {
      if (isEditMode) {
        const matchedData = data?.find((item) => item.id === editDataId);
        return {
          name: matchedData?.name ?? "",
        };
      }
      return {} as z.infer<typeof formSchema>;
    },
  });

  function onSubmitForm(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {!isAdding && "Submit"}
          {isAdding && <DotLoader />}
        </Button>
      </form>
    </Form>
  );
}
