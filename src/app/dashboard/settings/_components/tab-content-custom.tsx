"use client";

import { type PropertyItem } from "@prisma/client";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { TabsContent } from "~/components/ui/tabs";
import AlertDialogCustom from "./alert-dialog-custom";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddItemDialog } from "./add-item-dialog";

export default function TabsContentLocations({
  value,
  data,
  properties,
  accessor,
  label,
}: {
  value: string;
  data: {
    id: string;
    name: string;
  }[];
  properties: PropertyItem[];
  label: string;
  accessor: "locationId" | "categoryId";
}) {
  const router = useRouter();
  const [affectedProperties, setAffectedProperties] = useState<PropertyItem[]>(
    [],
  );
  const [selectedItem, setSelectedItem] = useState<(typeof data)[0]>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

  const showDeleteWarning = async (itemId: string, itemName: string) => {
    const matchedProperties = properties.filter(
      (property) => property[accessor] === itemId,
    );
    setShowAlert(true);
    setAffectedProperties(matchedProperties);
    setSelectedItem({ id: itemId, name: itemName });
  };

  const deleteLocationItem = api.locations.delete.useMutation({
    async onSuccess(params) {
      const itemName = data.find((item) => item.id === params.id);
      toast.success(`Deleted ${itemName?.name} location successfully`);
      router.refresh();
    },
  });

  const deleteCategoryItem = api.categories.delete.useMutation({
    async onSuccess(params) {
      const itemName = data.find((item) => item.id === params.id);
      toast.success(`Deleted ${itemName?.name} category successfully`);
      router.refresh();
    },
  });
  const addLocationItem = api.locations.create.useMutation({
    async onError(params) {
      toast.error(
        `Unable to add, ${params.data?.code}. Please check if you have duplicates.`,
      );
    },
    async onSuccess(params) {
      toast.success(`Added ${params.name} successfully`);
      setShowAddDialog(false);
      router.refresh();
    },
  });

  const addCategoryItem = api.categories.create.useMutation({
    async onError(params) {
      toast.error(
        `Unable to add, ${params.data?.code}. Please check if you have duplicates.`,
      );
    },
    async onSuccess(params) {
      toast.success(`Added ${params.name} successfully`);
      setShowAddDialog(false);
      router.refresh();
    },
  });

  const onDelete = async (accessor: "locationId" | "categoryId") => {
    if (accessor === "locationId")
      await deleteLocationItem.mutateAsync({
        locationId: selectedItem?.id ?? "",
      });
    else
      await deleteCategoryItem.mutateAsync({
        categoryId: selectedItem?.id ?? "",
      });
  };

  const onAdd = async (
    accessor: "locationId" | "categoryId",
    formValues: { name: string },
  ) => {
    if (accessor === "locationId")
      await addLocationItem.mutateAsync({
        name: formValues.name,
      });
    else
      await addCategoryItem.mutateAsync({
        name: formValues.name,
      });
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
      <Button
        className="mx-4 flex gap-4"
        variant="outline"
        onClick={() => setShowAddDialog(true)}
      >
        <PlusCircledIcon className="size-4" />
        {`Add New ${label}`}
      </Button>
      <AlertDialogCustom
        open={showAlert}
        setOpen={setShowAlert}
        affectedProperties={affectedProperties}
        selectedItemName={selectedItem?.name ?? ""}
        onDelete={() => onDelete(accessor)}
      />
      <AddItemDialog
        open={showAddDialog}
        setOpen={setShowAddDialog}
        title={label}
        data={data}
        onAdd={async (formValues) => {
          await onAdd(accessor, formValues);
        }}
      />
    </TabsContent>
  );
}
