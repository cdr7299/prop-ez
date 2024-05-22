"use client";
import { type PropertyItem, type Customer } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { AddInterestedCustomerCombobox } from "./add-interested-customer-combobox";
import { type CustomerWithInterestedProperties } from "~/server/types/customer.types";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function InterestedCustomers({
  interestedCustomers,
  customers,
  selectedProperty,
}: {
  interestedCustomers: Customer[] | undefined;
  customers: CustomerWithInterestedProperties[];
  selectedProperty: PropertyItem | null;
}) {
  const router = useRouter();
  const { mutateAsync: removeInterestedCustomer } =
    api.properties.deleteInterestedCustomer.useMutation({
      onSuccess: () => {
        router.refresh();
        toast.success(`Customer removed from interested list`);
      },
      onError: () => {
        toast.error("Failed to remove customer from interested list");
      },
    });

  const onClickRemoveInterestedCustomer = async (customerId: string) => {
    await removeInterestedCustomer({
      customerId,
      propertyId: selectedProperty?.id ?? "",
    });
  };
  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-lg font-semibold">Interested Customers</h3>
      <div className="self-start sm:w-[30%]">
        <AddInterestedCustomerCombobox
          placeholder="Search Customers to add.."
          data={customers}
          property={selectedProperty}
        />
      </div>
      {interestedCustomers?.length !== 0 && (
        <div className="rounded-md border border-primary pb-4">
          <Table>
            <TableCaption className="sr-only">
              Customers interested in this property
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interestedCustomers?.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-semibold ">
                    {customer.name}
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell className="flex gap-4">
                    <Button size="sm" variant="outline">
                      Send Text Message
                    </Button>
                    <Button size="sm" variant="outline">
                      Send Email
                    </Button>
                    <Button size="sm" variant="outline">
                      Send Whatsapp
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        onClickRemoveInterestedCustomer(customer.id)
                      }
                    >
                      <TrashIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
