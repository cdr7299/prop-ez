"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { AddPropertyCombobox } from "./_components/add-property-form-combobox";
import {
  type Locations,
  type Category,
  type BrokerEntity,
  type PropertyItem,
} from "@prisma/client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DotLoader from "~/components/dot-loader";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  length: z.number(),
  width: z.number(),
  area: z.number().optional(),
  floors: z.number().int({ message: "Floors can be integers only" }),
  address: z.string().min(5),
  categoryId: z.string(),
  locationId: z.string(),
  brokerEntityId: z.string().optional(),
  pricePerSqFt: z.number(),
  calculatedPrice: z.number().optional(),
});

export function AddPropertyForm({
  categories,
  locations,
  brokers,
  properties,
  setOpen,
  isEditMode = false,
  editPropertyId,
}: {
  categories: Category[];
  properties?: PropertyItem[]; // only need to pass when editing data
  locations: Locations[];
  brokers: BrokerEntity[];
  setOpen: (arg: boolean) => void;
  isEditMode?: boolean;
  editPropertyId?: string;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      if (isEditMode) {
        const property = properties?.find((b) => b.id === editPropertyId);
        return {
          title: property?.title ?? "",
          length: property?.length ?? 0,
          width: property?.width ?? 0,
          floors: property?.floors ?? 0,
          address: property?.address ?? "",
          categoryId: property?.categoryId ?? "",
          locationId: property?.locationId ?? "",
          brokerEntityId: property?.brokerEntityId ?? "",
          pricePerSqFt: property?.pricePerSqFt ?? 0,
        };
      }
      return {} as z.infer<typeof formSchema>;
    },
  });
  // const categoryConfigs = api.categoriesConfig.list.useQuery();

  const watchLength = form.watch("length");
  const watchWidth = form.watch("width");
  const watchPricePerSqFt = form.watch("pricePerSqFt");

  useEffect(() => {
    if (watchLength && watchWidth) {
      form.setValue("area", form.getValues("length") * form.getValues("width"));
    }

    if (watchLength && watchWidth && watchPricePerSqFt) {
      form.setValue(
        "calculatedPrice",
        form.getValues("length") *
          form.getValues("width") *
          form.getValues("pricePerSqFt"),
      );
    }
  }, [watchLength, watchWidth, form, watchPricePerSqFt]);

  const { isLoading, mutateAsync } = api.properties.create.useMutation({
    onError: () => {
      toast.error("Failed to add property :(");
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Successfull added new property!");
      router.refresh();
    },
  });

  const { isLoading: isUpdating, mutateAsync: mutateAsyncUpdate } =
    api.properties.update.useMutation({
      onError: () => {
        toast.error("Failed to update property :(");
      },
      onSuccess: (params) => {
        setOpen(false);
        toast.success(`Successfull updated ${params.title} property!`);
        router.refresh();
      },
    });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode) {
      await mutateAsyncUpdate({ ...values, propertyId: editPropertyId ?? "" });
    } else await mutateAsync(values);
  }

  const setCategoryValue = useCallback(
    (val: string) => {
      form.setValue("categoryId", val);
      // const config = categoryConfigs.data?.find(
      //   (item) => item.categoryId === val,
      // );
      // if (config) {
      //   form.setValue("floors", config.floors);
      // }
    },
    [form],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Title *</FormLabel>
              <FormControl>
                <Input placeholder="Some info about property.." {...field} />
              </FormControl>
              <FormDescription>
                This is your unique property title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address *</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. 8355 - St. 18, Durga Puri, Haibowal"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between gap-6">
          <FormField
            control={form.control}
            name="locationId"
            render={({ field }) => (
              <FormItem className="flex basis-1/2 flex-col gap-2">
                <FormLabel>Location *</FormLabel>
                <FormControl>
                  <AddPropertyCombobox
                    placeholder="Select Locations.."
                    data={locations}
                    value={field.value}
                    setValue={(val) => form.setValue("locationId", val)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex basis-1/2 flex-col gap-2">
                <FormLabel>Category *</FormLabel>
                <FormControl>
                  <AddPropertyCombobox
                    placeholder="Select Category.."
                    data={categories}
                    value={field.value}
                    setValue={setCategoryValue}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* dimensions */}
        <div className="flex justify-between gap-6">
          <FormField
            control={form.control}
            name="floors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Floors *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex. 2"
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length(ft.) *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex. 50"
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width(ft.) *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex. 30"
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area(sq ft.)</FormLabel>
                <FormControl>
                  <Input placeholder="Length x Width" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* additional fields  */}
        <FormField
          control={form.control}
          name="brokerEntityId"
          render={({ field }) => (
            <FormItem className="flex basis-1/2 flex-col gap-2">
              <FormLabel>Select Broker</FormLabel>
              <FormControl>
                <AddPropertyCombobox
                  placeholder="Select Broker.."
                  data={brokers}
                  value={field.value}
                  setValue={(val) => form.setValue("brokerEntityId", val)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="pricePerSqFt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price(per sq ft.) *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex. 2"
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="calculatedPrice"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Property Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Length x Width x Price(sq.ft)"
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" variant="default" size="lg">
          {!isLoading && !isUpdating && "Submit"}
          {(isLoading || isUpdating) && <DotLoader />}
        </Button>
      </form>
    </Form>
  );
}
