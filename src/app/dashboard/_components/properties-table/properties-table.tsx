/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { type ColumnDef } from "@tanstack/react-table";

import {
  type PropertyItem,
  type BrokerEntity,
  type Locations,
} from "@prisma/client";
import { type CategoryWithConfig } from "~/server/types/categories.types";
import useBreakpoint from "~/hooks/useBreakpoint";
import PropertyTableSm from "./_components/properties-table-sm";
import PropertiesTableXL from "./_components/properties-table-xl";
import { PropertiesFinalItem } from "../../page";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  locations: Locations[];
  categories: CategoryWithConfig[];
  brokers: BrokerEntity[];
  properties: PropertiesFinalItem[];
}

export function PropertiesTable<TData, TValue>({
  columns,
  data,
  locations,
  categories,
  brokers,
  properties,
}: DataTableProps<TData, TValue>) {
  const breakpoint = useBreakpoint();
  if (breakpoint === "xs" || breakpoint === "sm") {
    return <PropertyTableSm data={data} properties={properties} />;
  } else {
    return (
      <PropertiesTableXL
        columns={columns}
        data={data}
        locations={locations}
        categories={categories}
        brokers={brokers}
        properties={properties}
      />
    );
  }
}
