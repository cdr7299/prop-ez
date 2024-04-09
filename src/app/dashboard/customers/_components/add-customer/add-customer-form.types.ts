import { z } from "zod";
import { PropertyStatusZodType } from "~/app/_types/properties";

export const AddCustomerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  phoneNumber: z
    .string()
    .min(10, "Phone number should be at least 10 digits")
    .max(10, "Phone number should be at most 10 digits")
    .optional()
    .or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
});
