import { type BrokerEntity, type Locations } from "@prisma/client";
import { DotsHorizontalIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAddressFromProperty } from "~/app/dashboard/_utils/property.utils";
import { type PropertiesFinalItem } from "~/app/dashboard/page";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type CategoryWithConfig } from "~/server/types/categories.types";
import { api } from "~/trpc/react";
import { EditProperty } from "../../edit-property";
import { useState } from "react";
import {
  type PropertyStatus,
  PropertyStatusOptions,
} from "~/app/_types/properties";

interface DataTableProps<TData> {
  data: TData[];
  locations: Locations[];
  categories: CategoryWithConfig[];
  brokers: BrokerEntity[];
  properties: PropertiesFinalItem[];
}

export default function PropertyTableSm<TData>(props: DataTableProps<TData>) {
  const { properties, categories, locations, brokers } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editPropertyId, setEditPropertyId] = useState<string>("");
  const sortedProperties = properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const { mutateAsync } = api.properties.delete.useMutation({
    onSuccess: (params) => {
      toast.success(`Deleted Property ${params.title}`);
      router.refresh();
    },
  });

  const { mutate: updateStatus } = api.properties.updateStatus.useMutation({
    onSuccess: (params) => {
      toast.success(`Updated Status for ${params.title}`);
      router.refresh();
    },
  });

  const onChangeStatus = (propertyId: string, value: string) => {
    updateStatus({
      propertyId: propertyId,
      status: value as PropertyStatus,
    });
  };
  return (
    <div className="flex flex-col gap-4">
      {sortedProperties.map((property) => (
        <div
          className="flex w-full flex-col items-start gap-8 rounded-md border-2 px-2 py-4 shadow-sm"
          key={property.id}
        >
          <div className="flex w-full items-start gap-1">
            <div className="flex w-full flex-col gap-1">
              <span className="font-semibold">{property.title}</span>
              <div className="flex gap-1 text-sm font-light">
                {getAddressFromProperty(property)}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link href={`/dashboard/${property.id}`}>
                <Button variant="ghost" className="!h-6 !py-0 px-1">
                  <OpenInNewWindowIcon />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                  >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem
                    className="font-semibold"
                    onClick={() => {
                      setOpen(true);
                      setEditPropertyId(property.id);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={property.status}
                        onValueChange={(value) => {
                          onChangeStatus(property.id, value);
                        }}
                      >
                        {PropertyStatusOptions.map((label) => (
                          <DropdownMenuRadioItem
                            key={label.label}
                            value={label.value}
                          >
                            {label.label}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="font-semibold"
                    onClick={async () => {
                      await mutateAsync({ propertyId: property.id });
                    }}
                  >
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              }).format(property.price ?? 0)}
            </span>
          </div>
        </div>
      ))}
      <EditProperty
        categories={categories}
        locations={locations}
        brokers={brokers}
        properties={properties}
        editPropertyId={editPropertyId}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
