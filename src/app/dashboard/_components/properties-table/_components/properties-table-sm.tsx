import { type BrokerEntity, type Locations } from "@prisma/client";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getAddressFromProperty } from "~/app/dashboard/_utils/property.utils";
import { type PropertiesFinalItem } from "~/app/dashboard/page";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { type CategoryWithConfig } from "~/server/types/categories.types";

interface DataTableProps<TData> {
  data: TData[];
  locations?: Locations[];
  categories?: CategoryWithConfig[];
  brokers?: BrokerEntity[];
  properties: PropertiesFinalItem[];
}

export default function PropertyTableSm<TData>(props: DataTableProps<TData>) {
  const { properties } = props;
  const sortedProperties = properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="flex flex-col gap-4">
      {sortedProperties.map((property) => (
        <div
          className="flex w-full flex-col items-start gap-8 rounded-md border-2 px-2 py-4 shadow-sm"
          key={property.id}
        >
          <div className="flex w-full items-start gap-1">
            <div className="flex w-full flex-col gap-1">
              <span className="font-semibold">{property.title}</span>
              <div className="flex gap-1 text-sm font-light">
                {getAddressFromProperty(property)}
              </div>
            </div>
            <Link href={`/dashboard/${property.id}`}>
              <Button variant="ghost" className="!px-1 !py-0">
                <OpenInNewWindowIcon className="!h-5 !w-5" />
              </Button>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between">
            <Badge variant="default" className="break-words px-3 py-1">
              <span className="!text-sm">{property.category}</span>
            </Badge>
            <span className="font-semibold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumSignificantDigits: 10,
              }).format(property.price ?? 0)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
