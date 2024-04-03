import { z } from "zod";
import { PropertyStatusZodType } from "~/app/_types/properties";

export const AddPropertyFormSchema = z.object({
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
  status: PropertyStatusZodType,
  tehsil: z.string().optional(),
  city: z.string(),
  state: z.string(),
  askingPrice: z.number().optional(),
  manualPricing: z.boolean(),
});
