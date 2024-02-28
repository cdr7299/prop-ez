import { z } from "zod";

export const brokerSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdById: z.string(),
  phoneNumber: z.string().nullable(),
});

export type BrokerSchema = z.infer<typeof brokerSchema>;
