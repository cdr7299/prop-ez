"use client";

import { type PropertyItem } from "@prisma/client";
import {
  Cross2Icon,
  Pencil2Icon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { TabsContent } from "~/components/ui/tabs";
import AlertDialogCustom from "../../alert-dialog-custom";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddLocationDialog } from "./add-location-dialog";
import { EditLocationDialog } from "./edit-location-dialog";

export default function TabsContentCustom({
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
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [editDataId, setEditDataId] = useState<string>("");

  const showDeleteWarning = async (itemId: string, itemName: string) => {
    const matchedProperties = properties.filter(
      (property) => property[accessor] === itemId,
    );
    setShowAlert(true);
    setAffectedProperties(matchedProperties);
    setSelectedItem({ id: itemId, name: itemName });
  };

  const { isLoading: isDeletingLocations, mutateAsync: deleteLocationsAsync } =
    api.locations.delete.useMutation({
      async onSuccess(params) {
        const itemName = data.find((item) => item.id === params.id);
        toast.success(`Deleted ${itemName?.name} location successfully`);
        router.refresh();
      },
    });

  const { isLoading: isAddingLocations, mutateAsync: addLocationsAsync } =
    api.locations.create.useMutation({
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

  const { isLoading: isUpdatingLocation, mutateAsync: updateLocation } =
    api.locations.update.useMutation({
      async onError(params) {
        toast.error(`Unable to update, ${params.data?.code}`);
      },
      async onSuccess(params) {
        toast.success(`Updated ${params.name} successfully`);
        setShowEditDialog(false);
        setEditDataId("");
        router.refresh();
      },
    });

  const onDelete = async () => {
    await deleteLocationsAsync({
      locationId: selectedItem?.id ?? "",
    });
  };

  const onAdd = async (formValues: { name: string }) => {
    await addLocationsAsync({
      name: formValues.name.trim(),
    });
  };
  const onUpdate = async (formValues: { name: string }) => {
    await updateLocation({
      name: formValues.name.trim(),
      locationId: editDataId,
    });
  };

  return (
    <TabsContent
      value={value}
      className="w-full sm:m-0 sm:min-h-[calc(100vh-4.5rem)] sm:py-0"
    >
      <div className="w-full border-b-2 px-4 py-4 text-2xl font-bold">
        <div className="hidden flex-col gap-2 sm:flex">
          {value}
          <span className="inline-flex text-sm font-bold">
            Here you can manage the saved {label.toLowerCase()}s for your
            properties.
          </span>
          <span className="inline-flex text-sm font-normal">
            These are used to categorize your properties.
          </span>
        </div>
      </div>
      <div></div>
      <div className="flex w-full flex-wrap gap-4 p-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-md bg-blue-200/70 px-4 py-1 text-sm font-semibold text-slate-800 dark:text-slate-100"
          >
            {item.name}
            <div className="flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditDataId(item.id);
                  setShowEditDialog(true);
                }}
              >
                <Pencil2Icon className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-destructive"
                onClick={() => showDeleteWarning(item.id, item.name)}
              >
                <Cross2Icon className="size-4" />
              </Button>
            </div>
          </div>
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
        isDeleting={isDeletingLocations}
        onDelete={() => onDelete()}
      />
      <AddLocationDialog
        isAdding={isAddingLocations}
        open={showAddDialog}
        setOpen={setShowAddDialog}
        title={label}
        onAdd={async (formValues) => {
          await onAdd(formValues);
        }}
      />
      <EditLocationDialog
        data={data}
        editDataId={editDataId}
        isUpdating={isUpdatingLocation}
        open={showEditDialog}
        setOpen={setShowEditDialog}
        title={label}
        onEdit={async (formValues) => {
          await onUpdate(formValues);
        }}
      />
    </TabsContent>
  );
}
