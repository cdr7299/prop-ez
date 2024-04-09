import { api } from "~/trpc/server";
import { getAddressFromProperty } from "../_utils/property.utils";
import { type PropertyItem } from "@prisma/client";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import PropertyDetails from "./_components/property-details";

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
  const customers = await api.customers.list.query();

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
      </div>
      <PropertyDetails property={selectedProperty} customers={customers} />
      <div className="w-full">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Category</h3>
          <span>{categoryData?.name}</span>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <h3 className="text-lg font-semibold">Interested Customers</h3>
        {interestedCustomers?.map((customer) => (
          <div key={customer.id} className="flex gap-6">
            <span>{customer.name}</span>
            <span>{customer.email}</span>
            <span>{customer.phoneNumber}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
