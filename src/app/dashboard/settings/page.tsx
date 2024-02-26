import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/server";
import TabsContentCustom from "./_components/tab-content-custom";

export default async function DashboardSettings() {
  const locations = await api.locations.getLatest.query();
  const categories = await api.categories.getLatest.query();
  const properties = await api.properties.getLatest.query();
  return (
    <div className="flex  size-full max-w-screen-2xl flex-col items-center justify-center">
      <Tabs defaultValue="Locations" className="flex size-full">
        <TabsList className="flex h-full flex-col justify-start gap-6 rounded-none border-x-[1px] !bg-inherit p-6">
          <TabsTrigger value="Locations">Manage Locations</TabsTrigger>
          <TabsTrigger value="Categories">Manage Categories</TabsTrigger>
        </TabsList>
        <TabsContentCustom
          value="Locations"
          data={locations}
          properties={properties}
          accessor="locationId"
        />
        <TabsContentCustom
          value="Categories"
          data={categories}
          properties={properties}
          accessor="categoryId"
        />
      </Tabs>
    </div>
  );
}
