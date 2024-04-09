import { type Customer } from "@prisma/client";
import { type z } from "zod";
import { type AddCustomerFormSchema } from "../add-customer-form.types";

export const getDefaultValuesForAddCustomerForm = async (
  isEditMode: boolean,
  customers: Customer[] | undefined,
  editCustomerId: string | undefined,
) => {
  if (isEditMode) {
    console.log(customers, editCustomerId);
    const customer =
      customers?.find((b) => b.id === editCustomerId) ?? ({} as Customer);
    return {
      name: customer.name ?? "",
      phoneNumber: customer.phoneNumber ?? "",
      email: customer.email ?? "",
    };
  }
  return {} as z.infer<typeof AddCustomerFormSchema>;
};
