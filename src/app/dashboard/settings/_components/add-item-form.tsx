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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export function AddItemForm({
  data,
  onSubmit,
}: {
  data: {
    id: string;
    name: string;
  }[];
  onSubmit: (args: { name: string }) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  function onSubmitForm(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: true,
            validate: (value, formValues) => {
              console.log("i raaaan", formValues, value);
              const hasDuplicate = data.find((item) => item.name === value);

              return !hasDuplicate || "Name already exists";
            },
          }}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}