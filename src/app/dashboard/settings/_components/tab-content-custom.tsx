"use client";

import { type PropertyItem } from "@prisma/client";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { TabsContent } from "~/components/ui/tabs";
import AlertDialogCustom from "./alert-dialog-custom";
import { api } from "~/trpc/react";

export default function TabsContentLocations({
  value,
  data,
  properties,
  accessor,
}: {
  value: string;
  data: {
    id: string;
    name: string;
  }[];
  properties: PropertyItem[];
  accessor: "locationId" | "categoryId";
}) {
  const [affectedProperties, setAffectedProperties] = useState<PropertyItem[]>(
    [],
  );
  // const deleteLocationMutation = api.locations.deleteTask.useMutation();
  const [selectedItemName, setSelectedItemName] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const showDeleteWarning = async (itemId: string, itemName: string) => {
    const matchedProperties = properties.filter(
      (property) => property[accessor] === itemId,
    );
    setShowAlert(true);
    setAffectedProperties(matchedProperties);
    setSelectedItemName(itemName);
  };

  const onDelete = () => {
    console.log("h");
  };

  return (
    <TabsContent value={value} className="w-full py-6">
      <div className="w-full border-b-2 px-4 py-4 text-2xl font-bold">
        {value}
      </div>
      <div className="flex w-full flex-wrap gap-4 p-4">
        {data.map((item) => (
          <Button
            key={item.id}
            className="flex gap-4 rounded-md bg-blue-200/70 px-6 py-2 font-bold text-primary-foreground"
            onClick={() => showDeleteWarning(item.id, item.name)}
          >
            {item.name}
            <Cross2Icon className="size-4" />
          </Button>
        ))}
      </div>
      <Button className="mx-4 flex gap-4" variant="outline">
        <PlusCircledIcon className="size-4" />
        {`Add New ${value}`}
      </Button>
      <AlertDialogCustom
        open={showAlert}
        setOpen={setShowAlert}
        affectedProperties={affectedProperties}
        selectedItemName={selectedItemName ?? ""}
        onDelete={onDelete}
      />
    </TabsContent>
  );
}
