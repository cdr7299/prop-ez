import { type Customer } from "@prisma/client";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { PropertyStatusLabels } from "~/app/_types/properties";
import { Button } from "~/components/ui/button";
import { type PropertyWithInterestedBuyers } from "~/server/types/properties.types";
export default async function PropertyDetails({
  property,
  customers,
}: {
  property: PropertyWithInterestedBuyers | null;
  customers: Customer[];
}) {
  const sellerData = customers.find(
    (customer) => customer.id === property?.sellerId,
  );

  return (
    <div className="flex w-full flex-col justify-between gap-3 sm:h-[350px] sm:flex-row">
      <div className="relative aspect-square h-full w-full rounded-2xl bg-gray-200 dark:bg-gray-800 sm:w-2/3">
        <Button className="absolute bottom-4 right-4">See all Photos</Button>
      </div>
      <div className="flex w-full flex-col items-start rounded-lg border-2 border-slate-400 bg-primary sm:w-1/3">
        <div className="flex h-[20%] w-full border-spacing-10 items-center justify-between border-b-2 border-slate-400 px-4 py-2">
          <div className="text-2xl font-semibold">Property Details</div>
          <div className="flex items-baseline gap-1">
            <span className="text-normal rounded-full border-2 border-primary bg-accent p-2 px-4 font-semibold text-white">
              {PropertyStatusLabels[property?.status ?? "on_market"]}
            </span>
          </div>
        </div>
        <div className="flex h-[80%] w-full flex-col flex-wrap content-start gap-x-8 gap-y-4 p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <h3 className="text-normal font-bold">Dimensions:</h3>
              <span className="">{property?.length?.toFixed(1)}</span>x
              <span>{property?.width?.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <h3 className="text-normal font-bold">Floors:</h3>
            <span>{property?.floors}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <h3 className="text-normal font-bold">Price per SqFt. :</h3>
            <span>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumSignificantDigits: 6,
              }).format(Number(property?.pricePerSqFt))}
            </span>
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
      </div>
    </div>
  );
}
