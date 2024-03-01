import { columns } from "./_components/properties-table/columns";
import { PropertiesTable } from "./_components/properties-table/properties-table";
import { type Metadata } from "next";
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { Settings } from "lucide-react";
import { AddProperty } from "./_components/add-property/add-property";
import DashboardCards from "./_components/dashboard-cards/dashboard-cards";
import { IdCardIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Properties",
  description: "All saved properties",
};

export default async function Dashboard() {
  const locations = await api.locations.list.query();
  const categories = await api.categories.list.query();
  const properties = await api.properties.list.query();
  const brokers = await api.brokers.list.query();
  const propertiesFinal = properties.map((item) => ({
    ...item,
    area: (item.length ?? 0) * (item.width ?? 0),
    price: (item.pricePerSqFt ?? 0) * (item.length ?? 0) * (item.width ?? 0),
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
    <div className="size-full max-w-screen-2xl">
      <div className="flex min-h-full flex-1 flex-col space-y-8 px-4 py-8 md:flex">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome back, {session?.user.name}
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of properties you have saved!
            </p>
          </div>
          <div className="fixed bottom-0 z-10 flex  w-full flex-wrap items-center justify-between gap-4 border-t-2 bg-white p-4 dark:bg-[#020817] md:static md:bottom-auto md:w-auto md:border-0">
            <AddProperty
              categories={categories}
              locations={locations}
              brokers={brokers}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="items-center gap-2"
                asChild
              >
                <Link href="/dashboard/brokers" className="text-sm">
                  Brokers <IdCardIcon className="size-5" />
                </Link>
              </Button>
              {/* <Button variant="secondary" asChild className="items-center gap-2">
              <Link href="/dashboard/archived" className="text-sm">
              Archive <ArchiveIcon className="size-4" />
              </Link>
            </Button> */}
              <Button variant="secondary" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <DashboardCards />
        <PropertiesTable
          data={propertiesFinal}
          columns={columns}
          locations={locations}
          categories={categories}
          brokers={brokers}
          properties={properties}
        />
      </div>
    </div>
  );
}
