import { z } from "zod";
import { PropertyStatusZodType } from "~/app/_types/properties";

export const propertySchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  address: z.string(),
  createdAt: z.date(),
  length: z.number().nullable(),
  width: z.number().nullable(),
  area: z.number().nullable(),
  floors: z.number().nullable(),
  location: z.string().nullable(),
  category: z.string().nullable(),
  pricePerSqFt: z.number().nullable(),
  status: PropertyStatusZodType,
});

export type PropertyItem = z.infer<typeof propertySchema>;
