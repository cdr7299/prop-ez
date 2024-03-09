import { z } from "zod";

export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdById: z.string(),
  email: z.string().nullable(),
  phoneNumber: z.string().nullable(),
});

export type CustomerSchema = z.infer<typeof customerSchema>;
