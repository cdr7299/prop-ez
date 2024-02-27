import { z } from "zod";
// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

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
});

export type Task = z.infer<typeof taskSchema>;
export type PropertyItem = z.infer<typeof propertySchema>;
