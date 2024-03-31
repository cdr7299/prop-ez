import { z } from "zod";

export const CategoryFormSchemaZodObject = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  fillPrice: z.boolean(),
  fillDefaultFields: z.boolean(),
  defaultFloors: z.number(),
  defaultPricePerSqFt: z.number(),
  defaultLength: z.number(),
  defaultWidth: z.number(),
});

export type CategoryFormSchema = z.infer<typeof CategoryFormSchemaZodObject>;
