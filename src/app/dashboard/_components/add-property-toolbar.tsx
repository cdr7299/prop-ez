import Link from "next/link";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { AddProperty } from "./add-property/add-property";
import { Button } from "~/components/ui/button";

import { IdCardIcon } from "@radix-ui/react-icons";
import { type Locations, type BrokerEntity } from "@prisma/client";
import { type CategoryWithConfig } from "~/server/types/categories.types";

export default function AddPropertyToolbar({
  categories,
  locations,
  brokers,
}: {
  categories: CategoryWithConfig[];
  locations: Locations[];
  brokers: BrokerEntity[];
}) {
  return (
    <div className="fixed bottom-0 z-10 flex  w-full flex-wrap items-center justify-between gap-4 border-t-2 bg-white p-4 dark:bg-[#020817] md:static md:bottom-auto md:w-auto md:border-0">
      <AddProperty
        categories={categories}
        locations={locations}
        brokers={brokers}
      />
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="items-center gap-2" asChild>
          <Link href="/dashboard/brokers" className="text-sm">
            <IdCardIcon className="size-5" />
            <span className="hidden sm:inline-block">Brokers</span>
          </Link>
        </Button>
        <Button variant="secondary" asChild className="items-center gap-2">
          <Link
            href="/dashboard/customers"
            className="flex items-center text-sm"
          >
            <PersonIcon className="size-4" />{" "}
            <span className="hidden sm:inline-block">Customers</span>
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/dashboard/settings" className="flex items-center gap-2">
            <GearIcon className="size-4" />{" "}
            <span className="hidden sm:inline-block">Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
