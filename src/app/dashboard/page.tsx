import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { type Metadata } from "next";
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Properties",
  description: "All saved properties",
};

export default async function Dashboard() {
  const locations = await api.locations.getLatest.query();
  const categories = await api.categories.getLatest.query();

  const properties = await api.properties.getLatest.query();
  const propertiesFinal = properties.map((item) => ({
    ...item,
    category:
      categories.find((category) => category.id === item.categoryId)?.name ??
      "",
    location:
      locations.find((location) => item.locationId === location.id)?.name ?? "",
  }));
  const session = await getServerAuthSession();
  return (
    <div className="size-full max-w-screen-2xl">
      <div className="flex h-full flex-1 flex-col space-y-8 px-4 py-8 md:flex">
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
            <Button variant="default">Add Property</Button>
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
        <DataTable data={propertiesFinal} columns={columns} />
      </div>
    </div>
  );
}

// Simulate a database read for tasks.
