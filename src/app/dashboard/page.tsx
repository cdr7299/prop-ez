import { columns } from "./_components/properties-table/columns";
import { DataTable } from "./_components/properties-table/data-table";
import { type Metadata } from "next";
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { Settings } from "lucide-react";
import { AddProperty } from "./_components/add-property/add-property";
import DashboardCards from "./_components/dashboard-cards/dashboard-cards";

export const metadata: Metadata = {
  title: "Properties",
  description: "All saved properties",
};

export default async function Dashboard() {
  const locations = await api.locations.list.query();
  const categories = await api.categories.list.query();
  const properties = await api.properties.list.query();
  console.log(properties);
  const propertiesFinal = properties.map((item) => ({
    ...item,
    area: (item.length ?? 0) * (item.width ?? 0),
    price: (item.pricePerSqFt ?? 0) * (item.length ?? 0) * (item.width ?? 0),
    category:
      categories.find((category) => category.id === item.categoryId)?.name ??
      "",
    location:
      locations.find((location) => item.locationId === location.id)?.name ?? "",
  }));

  const session = await getServerAuthSession();
  return (
    <div className="size-full max-w-screen-2xl">
      <div className="flex min-h-full flex-1 flex-col space-y-8 px-4 py-8 md:flex">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome back, {session?.user.name}
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of properties you have saved!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <AddProperty />
            {/* <Button variant="secondary">Manage Categories</Button>
            <Button variant="secondary">Manage Locations</Button>
            <Button variant="secondary">Manage Statues</Button> */}
            <Button variant="secondary" asChild>
              <Link href="/dashboard/settings">
                <Settings className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
        <DashboardCards />
        <DataTable
          data={propertiesFinal}
          columns={columns}
          locations={locations}
          categories={categories}
        />
      </div>
    </div>
  );
}

// Simulate a database read for tasks.
