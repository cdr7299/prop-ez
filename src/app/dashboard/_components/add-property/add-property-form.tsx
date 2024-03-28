"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
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
import { AddPropertyCombobox } from "./_components/add-property-form-combobox";
import {
  type Locations,
  type BrokerEntity,
  type PropertyItem,
  type CategoryConfig,
} from "@prisma/client";
import DotLoader from "~/components/dot-loader";
import { type CategoryWithConfig } from "~/server/types/categories.types";
import { Checkbox } from "~/components/ui/checkbox";
import { AddPropertyFormSchema } from "./add-property-form.types";
import { getDefaultValuesForAddPropertyForm } from "./_utils/add-property-utils";

interface AddPropertyFormProps {
  categories: Array<CategoryWithConfig>;
  locations: Locations[];
  brokers: BrokerEntity[];
  properties?: PropertyItem[];
  setOpen: (arg: boolean) => void;
  isEditMode?: boolean;
  editPropertyId?: string;
  onSubmit: (values: z.infer<typeof AddPropertyFormSchema>) => void;
  isLoading: boolean;
}

export function AddPropertyForm({
  categories,
  locations,
  brokers,
  properties,
  setOpen,
  isEditMode = false,
  editPropertyId,
  onSubmit,
  isLoading,
}: AddPropertyFormProps) {
  const form = useForm<z.infer<typeof AddPropertyFormSchema>>({
    resolver: zodResolver(AddPropertyFormSchema),
    defaultValues: () =>
      getDefaultValuesForAddPropertyForm(
        isEditMode,
        properties,
        editPropertyId,
      ),
  });
  const watchLength = form.watch("length");
  const watchWidth = form.watch("width");
  const watchPricePerSqFt = form.watch("pricePerSqFt");
  const watchCategoryId = form.watch("categoryId");
  const watchManualPricing = form.watch("manualPricing");

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

  useEffect(() => {
    if (watchManualPricing) {
      form.setValue("askingPrice", form.getValues("askingPrice") ?? 0);
    } else if (
      form.getValues("length") &&
      form.getValues("width") &&
      form.getValues("pricePerSqFt")
    ) {
      form.setValue(
        "calculatedPrice",
        form.getValues("length") *
          form.getValues("width") *
          form.getValues("pricePerSqFt"),
      );
    }
  }, [watchManualPricing, form]);

  const setCategoryValue = useCallback(
    (val: string) => {
      form.setValue("categoryId", val);
      const categoryData = categories.find((item) => item.id === val);
      const categoryConfig =
        categoryData?.CategoryConfig ?? ({} as CategoryConfig);

      if (categoryConfig && categoryConfig.fillDefaultFields) {
        form.setValue("floors", categoryConfig?.defaultFloors);
        form.setValue("width", categoryConfig?.defaultWidth);
        form.setValue("length", categoryConfig?.defaultLength);
        form.setValue("pricePerSqFt", categoryConfig?.defaultPricePerSqFt);
      }
      form.setValue("manualPricing", !categoryConfig?.fillPrice);
    },
    [form, categories],
  );

  const getPriceSection = () => {
    if (!watchCategoryId) {
      return <></>;
    } else {
      return !watchManualPricing ? (
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
      ) : (
        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Asking Price</FormLabel>
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
      );
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 overflow-y-scroll px-4"
      >
        <div className="flex justify-between gap-2 sm:gap-6 md:flex-nowrap">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Property Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. Good location, good rate, bank held etc"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Address *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. 8355 - St. 18, Durga Puri"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between gap-2 sm:gap-6 md:flex-nowrap">
          <FormField
            control={form.control}
            name="tehsil"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Tehsil</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="eg. Ludhiana" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="eg. Punjab" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-2 sm:gap-6">
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
        <div className="grid-rows-auto grid grid-cols-2 items-center justify-between gap-2 sm:grid-cols-4 sm:gap-6">
          <FormField
            control={form.control}
            name="floors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floors *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. 2"
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
                    placeholder="eg. 50"
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
                    {...field}
                    placeholder="eg. 30"
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
        <FormField
          control={form.control}
          name="manualPricing"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  className="!m-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="!m-0">Manual Pricing</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-2 sm:gap-6">
          <FormField
            control={form.control}
            name="pricePerSqFt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price(per sq ft.) *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. 2"
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {getPriceSection()}
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
