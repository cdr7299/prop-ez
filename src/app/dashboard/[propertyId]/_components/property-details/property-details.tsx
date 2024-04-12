import { PropertyStatusLabels } from "~/app/_types/properties";
import { Button } from "~/components/ui/button";
import { type PropertyWithInterestedBuyers } from "~/server/types/properties.types";
export default async function PropertyDetails({
  property,
  categoryName,
}: {
  property: PropertyWithInterestedBuyers | null;
  categoryName: string | undefined;
}) {
  return (
    <div className="flex w-full flex-col justify-between gap-3 sm:h-[350px] sm:flex-row">
      <div className="relative flex aspect-square h-full w-full items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 sm:w-2/3">
        <span className="text-sm font-semibold">
          No images uploaded for this property yet
        </span>
        <Button className="absolute bottom-4 right-4" disabled>
          See all Photos
        </Button>
      </div>
      <div className="flex w-full flex-col items-start rounded-lg border-2 border-slate-400 bg-primary sm:w-1/3">
        <div className="flex h-[20%] w-full border-spacing-10 items-center justify-between border-b-2 border-slate-400 px-4 py-2">
          <div className="text-xl font-bold">Property Details</div>
          <div className="flex items-baseline gap-1">
            <span className="rounded-full border-2 border-primary bg-accent p-2 px-4 text-sm font-semibold text-white">
              {PropertyStatusLabels[property?.status ?? "on_market"]}
            </span>
          </div>
        </div>
        <div className="flex h-[80%] w-full flex-col flex-wrap content-start gap-x-8 gap-y-2 p-4">
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
            <h3 className="text-normal font-bold">Category: </h3>
            <span>{categoryName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
