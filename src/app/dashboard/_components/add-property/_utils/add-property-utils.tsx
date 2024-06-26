import { type PropertyItem } from "@prisma/client";
import { type z } from "zod";
import { type AddPropertyFormSchema } from "../add-property-form.types";

export const getDefaultValuesForAddPropertyForm = async (
  isEditMode: boolean,
  properties: PropertyItem[] | undefined,
  editPropertyId: string | undefined,
) => {
  if (isEditMode) {
    const property =
      properties?.find((b) => b.id === editPropertyId) ?? ({} as PropertyItem);
    return {
      ...property,
      title: property?.title ?? "",
      length: property?.length ?? 0,
      width: property?.width ?? 0,
      floors: property?.floors ?? 0,
      address: property?.address ?? "",
      categoryId: property?.categoryId ?? "",
      locationId: property?.locationId ?? "",
      brokerEntityId: property?.brokerEntityId ?? "",
      pricePerSqFt: property?.pricePerSqFt ?? 0,
      tehsil: property?.tehsil ?? "",
      state: property?.state ?? "",
      city: property?.city ?? "",
      askingPrice: property?.askingPrice ?? 0,
      manualPricing: !!property?.manualPricing,
    };
  }
  return {
    status: "on_market",
  } as z.infer<typeof AddPropertyFormSchema>;
};
