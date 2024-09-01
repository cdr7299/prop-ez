import { BrokerEntity, Locations, PropertyItem } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { getAddressFromProperty } from "~/app/dashboard/_utils/property.utils";
import { PropertiesFinalItem } from "~/app/dashboard/page";
import { Badge } from "~/components/ui/badge";
import { CategoryWithConfig } from "~/server/types/categories.types";

interface DataTableProps<TData, TValue> {
  data: TData[];
  locations?: Locations[];
  categories?: CategoryWithConfig[];
  brokers?: BrokerEntity[];
  properties: PropertiesFinalItem[];
}

export default function PropertyTableSm<TData, TValue>(
  props: DataTableProps<TData, TValue>,
) {
  const { data, properties } = props;
  console.log("data", data, "properties", properties);
  return (
    <div className="flex flex-col gap-4">
      {properties.map((property) => (
        <div className="flex w-full flex-col items-start gap-8 rounded-md border-2 px-2 py-4 shadow-sm">
          <div className="flex w-full flex-col gap-1">
            <span className="font-semibold">{property.title}</span>
            <div className="flex gap-1 text-sm font-light">
              {getAddressFromProperty(property)}
            </div>
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
              }).format(property.price || 0)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
