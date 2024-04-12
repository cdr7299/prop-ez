import { api } from "~/trpc/server";
import { getAddressFromProperty } from "../_utils/property.utils";
import { type PropertyItem } from "@prisma/client";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import PropertyDetails from "./_components/property-details";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import InterestedCustomers from "./_components/interested-customers";
import { Separator } from "~/components/ui/separator";

export default async function Property({
  params,
}: {
  params: { propertyId: string };
}) {
  const selectedProperty =
    await api.properties.listPropertyIdWithInterestedCustomers.query({
      id: params.propertyId,
    });
  console.log(selectedProperty);
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
        {getAddressFromProperty(selectedProperty ?? ({} as PropertyItem))}
      </div>
      <PropertyDetails
        property={selectedProperty}
        categoryName={categoryData?.name}
      />
      <div className="flex w-full items-baseline gap-1">
        <h3 className="text-normal font-bold">Sold By: </h3>
        <div className="font-semibold">
          <span>
            {sellerData ? (
              sellerData.name
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-normal">Unknown</span>
                <Button
                  className="flex h-2 gap-3 px-2 py-1"
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
      <Separator />
      <InterestedCustomers
        customers={customers}
        selectedProperty={selectedProperty}
        interestedCustomers={interestedCustomers}
      />
    </div>
  );
}
