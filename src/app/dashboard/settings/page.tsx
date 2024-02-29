import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/server";
import TabsContentCustom from "./_components/tab-content-custom";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import TabsContentCustomCategories from "./_components/tab-content-custom-categories";

export default async function DashboardSettings() {
  const locations = await api.locations.list.query();
  const categories = await api.categories.list.query();
  const properties = await api.properties.list.query();

  return (
    <div className="flex size-full max-w-screen-2xl flex-col items-center justify-center">
      <Tabs defaultValue="Locations" className="flex size-full">
        <TabsList className="flex h-full flex-col justify-start gap-4 rounded-none border-x-[1px] !bg-inherit py-4 sm:px-6">
          <Link
            href="/dashboard"
            className="text-normal flex w-full items-center gap-2 self-start font-extrabold underline-offset-4 hover:underline"
          >
            <ArrowLeftIcon className="size-3" />
            Back
          </Link>
          <TabsTrigger value="Locations">Manage Locations</TabsTrigger>
          <TabsTrigger value="Categories">Manage Categories</TabsTrigger>
        </TabsList>
        <TabsContentCustom
          value="Locations"
          data={locations}
          properties={properties}
          label={"Location"}
          accessor="locationId"
        />
        <TabsContentCustomCategories
          value="Categories"
          data={categories}
          properties={properties}
          label={"Category"}
          accessor="categoryId"
        />
      </Tabs>
    </div>
  );
}
