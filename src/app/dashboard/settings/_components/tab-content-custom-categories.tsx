"use client";

import { type PropertyItem } from "@prisma/client";
import { Pencil2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { TabsContent } from "~/components/ui/tabs";
import AlertDialogCustom from "./alert-dialog-custom";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddItemDialog } from "./add-item-dialog";

export default function TabsContentCustomCategories({
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

  const {
    isLoading: isDeletingCategories,
    mutateAsync: deleteCategoriesAsync,
  } = api.categories.delete.useMutation({
    async onSuccess(params) {
      const itemName = data.find((item) => item.id === params.id);
      toast.success(`Deleted ${itemName?.name} category successfully`);
      router.refresh();
    },
  });

  const { isLoading: isAddingCategories, mutateAsync: addCategoriesAsync } =
    api.categories.create.useMutation({
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

  const onDelete = async () => {
    await deleteCategoriesAsync({
      categoryId: selectedItem?.id ?? "",
    });
  };

  const onAdd = async (formValues: { name: string }) => {
    await addCategoriesAsync({
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
            <Pencil2Icon className="size-4" />
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
        isDeleting={isDeletingCategories}
        onDelete={() => onDelete()}
      />
      <AddItemDialog
        isAdding={isAddingCategories}
        open={showAddDialog}
        setOpen={setShowAddDialog}
        title={label}
        onAdd={async (formValues) => {
          await onAdd(formValues);
        }}
      />
    </TabsContent>
  );
}