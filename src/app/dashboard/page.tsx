import { columns } from "./_components/properties-table/columns";
import { PropertiesTable } from "./_components/properties-table/properties-table";
import { type Metadata } from "next";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import DashboardCards from "./_components/dashboard-cards/dashboard-cards";
import AddPropertyToolbar from "./_components/add-property-toolbar";
import { getPriceFromProperty } from "./_utils/property-table.utils";
import { Category, Locations, type PropertyItem } from "@prisma/client";

export const metadata: Metadata = {
  title: "Properties",
  description: "All saved properties",
};

export type PropertiesFinalItem = PropertyItem & {
  area: number;
  price: number | null;
  category: string;
  location: string;
  brokerName?: string | null;
  brokerContactNumber?: string | null;
};

export default async function Dashboard() {
  const locations = await api.locations.list.query();
  const categories = await api.categories.list.query();
  const properties = await api.properties.list.query();

  const brokers = await api.brokers.list.query();

  const propertiesFinal = properties.map((item) => ({
    ...item,
    area: (item.length ?? 0) * (item.width ?? 0),
    price: getPriceFromProperty(item),
    category:
      categories.find((category) => category.id === item.categoryId)?.name ??
      "",
    location:
      locations.find((location) => item.locationId === location.id)?.name ?? "",
    brokerName: brokers.find((broker) => item.brokerEntityId === broker.id)
      ?.name,
    brokerContactNumber: brokers.find(
      (broker) => item.brokerEntityId === broker.id,
    )?.phoneNumber,
  }));

  const session = await getServerAuthSession();
  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex w-full max-w-screen-2xl flex-1 flex-col space-y-8 px-4 py-8 md:flex">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
          <div className="flex w-full flex-col items-start gap-2 md:w-auto">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Welcome back, {session?.user.name}
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of properties you have saved!
            </p>
          </div>
          <AddPropertyToolbar
            categories={categories}
            locations={locations}
            brokers={brokers}
          />
        </div>
        <DashboardCards />
        <PropertiesTable
          data={propertiesFinal}
          columns={columns}
          locations={locations}
          categories={categories}
          brokers={brokers}
          properties={propertiesFinal}
        />
      </div>
    </div>
  );
}
