import { api } from "~/trpc/server";
import { getAddressFromProperty } from "../_utils/property.utils";
import { type PropertyItem } from "@prisma/client";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import PropertyDetails from "./_components/property-details";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { AddInterestedCustomerCombobox } from "./_components/add-interested-customer-combobox";

export default async function Property({
  params,
}: {
  params: { propertyId: string };
}) {
  const selectedProperty =
    await api.properties.listPropertyIdWithInterestedCustomers.query({
      id: params.propertyId,
    });
  const categories = await api.categories.list.query();
  const customers = await api.customers.listWithInterestedProperties.query();
  const sellerData = customers.find(
    (customer) => customer.id === selectedProperty?.sellerId,
  );

  const categoryData = categories.find(
    (category) => category.id === selectedProperty?.categoryId,
  );
  const interestedCustomers = selectedProperty?.interestedBuyers;
  return (
    <div className="flex min-h-screen w-full max-w-screen-2xl flex-col items-center gap-4">
      <Link
        href="/dashboard"
        className="flex w-full items-center gap-1 self-start text-xs font-bold underline-offset-4 hover:underline sm:gap-2 sm:text-sm"
      >
        <ArrowLeftIcon className="size-3" />
        Back
      </Link>
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-2xl font-bold">{selectedProperty?.title}</h1>
        <div>
          {getAddressFromProperty(selectedProperty ?? ({} as PropertyItem))}
        </div>
        <div className="flex items-baseline gap-1">
          <h3 className="text-normal font-bold">Sold By: </h3>
          <div className="font-semibold">
            <span>
              {sellerData ? (
                sellerData.name
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-normal">Unknown</span>
                  <Button
                    className="flex gap-3 px-2"
                    size="sm"
                    variant="outline"
                  >
                    <PlusCircledIcon />
                    Add Seller
                  </Button>
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
      <PropertyDetails property={selectedProperty} />
      <div className="w-full">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Category</h3>
          <span>{categoryData?.name}</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <h3 className="text-lg font-semibold">Interested Customers</h3>
        <div className="w-[30%] self-start">
          <AddInterestedCustomerCombobox
            placeholder="Search Customers to add.."
            data={customers}
            property={selectedProperty}
          />
        </div>
        {interestedCustomers?.map((customer) => (
          <div
            key={customer.id}
            className="flex w-fit gap-6 rounded-sm bg-accent p-3 text-white"
          >
            <span>{customer.name}</span>
            <span>{customer.email}</span>
            <span>{customer.phoneNumber}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
