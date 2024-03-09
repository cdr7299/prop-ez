import { api } from "~/trpc/server";
import TabsContentCustomLocations from "./_components/tab-content-custom-locations";

import TabsContentCustomCategories from "./_components/tab-content-custom-categories";

export default async function DashboardSettings() {
  const locations = await api.locations.list.query();
  const categories = await api.categories.list.query();
  const properties = await api.properties.list.query();
  return (
    <>
      <TabsContentCustomLocations
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
    </>
  );
}
