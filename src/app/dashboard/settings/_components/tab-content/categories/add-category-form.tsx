"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import DotLoader from "~/components/dot-loader";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type CategoryWithConfig } from "~/server/types/categories.types";
import {
  type CategoryFormSchema,
  CategoryFormSchemaZodObject,
} from "./categories.types";
import { type CategoryConfig } from "@prisma/client";

export function AddCategoryForm({
  onSubmit,
  isAdding,
  data,
  editDataId,
  isEditMode,
}: {
  onSubmit: (args: CategoryFormSchema) => void;
  isAdding: boolean;
  data?: Array<CategoryWithConfig>;
  editDataId?: string;
  isEditMode?: boolean;
}) {
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(CategoryFormSchemaZodObject),
    mode: "onChange",
    defaultValues: async () => {
      if (isEditMode) {
        const matchedData = data?.find((item) => item.id === editDataId);
        const categoryConfig =
          matchedData?.CategoryConfig ?? ({} as CategoryConfig);
        return {
          name: matchedData?.name ?? "",
          defaultFloors: categoryConfig?.defaultFloors ?? 0,
          defaultPricePerSqFt: categoryConfig?.defaultPricePerSqFt ?? 0,
          defaultLength: categoryConfig?.defaultLength ?? 0,
          defaultWidth: categoryConfig?.defaultWidth ?? 0,
          fillDefaultFields: categoryConfig?.fillDefaultFields ?? false,
          fillPrice: categoryConfig?.fillPrice ?? false,
        };
      }
      return {
        defaultFloors: 0,
        fillPrice: true,
        fillDefaultFields: false,
        defaultPricePerSqFt: 0,
        defaultLength: 0,
        defaultWidth: 0,
      } as CategoryFormSchema;
    },
  });
  function onSubmitForm(values: CategoryFormSchema) {
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
        <FormField
          control={form.control}
          name="fillPrice"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="!m-0 flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <InfoCircledIcon className="size-4"></InfoCircledIcon>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-96">
                      <span className="">
                        Fill Property Price for this category based on Length x
                        Width x Price per sq ft when adding a new property.
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                Autofill Price
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fillDefaultFields"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="!m-0 flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <InfoCircledIcon className="size-4"></InfoCircledIcon>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-96">
                      Fill the following fields when this category is selected
                      while adding a new property.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                Autofill Fields with default values
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="defaultFloors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Floor Count</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultPricePerSqFt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Price Per Sq Ft. </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Length </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultWidth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Width</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          {!isAdding && "Submit"}
          {isAdding && <DotLoader />}
        </Button>
      </form>
    </Form>
  );
}
