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
import { AddCategoryDialog } from "./add-category-dialog";
import { EditCategoryDialog } from "./edit-category-dialog";
import { type CategoryWithConfig } from "~/server/types/categories.types";
import { type CategoryFormSchema } from "./categories.types";
import { type Category } from "@prisma/client";

export default function TabsContentCustomCategories({
  value,
  data,
  properties,
  accessor,
  label,
}: {
  value: string;
  data: CategoryWithConfig[];
  properties: PropertyItem[];
  label: string;
  accessor: "locationId" | "categoryId";
}) {
  const router = useRouter();
  const [affectedProperties, setAffectedProperties] = useState<PropertyItem[]>(
    [],
  );
  const [selectedItem, setSelectedItem] = useState<Category>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  const [editDataId, setEditDataId] = useState<string>("");

  const showDeleteWarning = async (item: Category) => {
    const matchedProperties = properties.filter(
      (property) => property[accessor] === item.id,
    );
    setShowAlert(true);
    setAffectedProperties(matchedProperties);
    setSelectedItem({ ...item });
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

  const { isLoading: isUpdatingCategories, mutateAsync: updateCategory } =
    api.categories.update.useMutation({
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
    await deleteCategoriesAsync({
      categoryId: selectedItem?.id ?? "",
    });
  };

  const onAdd = async (formValues: CategoryFormSchema) => {
    await addCategoriesAsync({
      name: formValues.name,
      fillDefaultFields: formValues.fillDefaultFields,
      fillPrice: formValues.fillPrice,
      defaultLength: formValues.defaultLength,
      defaultWidth: formValues.defaultWidth,
      defaultPricePerSqFt: formValues.defaultPricePerSqFt,
      defaultFloors: formValues.defaultFloors,
    });
  };

  const onEdit = async (formValues: CategoryFormSchema) => {
    await updateCategory({ ...formValues, categoryId: editDataId });
  };

  return (
    <TabsContent
      value={value}
      className="m-0 w-full sm:min-h-[calc(100vh-4.5rem)] sm:py-0"
    >
      <div className="w-full border-b-2 px-4 py-4 text-2xl font-bold">
        <div className="hidden flex-col gap-2 sm:flex">
          {value}
          <span className="inline-flex text-sm font-bold ">
            Here you can manage the saved categories for your properties.
          </span>
          <span className="inline-flex text-sm font-normal">
            You can configure the default values for each category, auto fill
            price etc.
          </span>
        </div>
      </div>
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
                onClick={() => showDeleteWarning(item)}
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
        isDeleting={isDeletingCategories}
        onDelete={() => onDelete()}
      />
      <AddCategoryDialog
        isAdding={isAddingCategories}
        open={showAddDialog}
        setOpen={setShowAddDialog}
        title={label}
        onAdd={async (formValues: CategoryFormSchema) => {
          await onAdd(formValues);
        }}
      />
      <EditCategoryDialog
        data={data}
        editDataId={editDataId}
        isUpdating={isUpdatingCategories}
        open={showEditDialog}
        setOpen={setShowEditDialog}
        title={label}
        onEdit={async (formValues: CategoryFormSchema) => {
          await onEdit(formValues);
        }}
      />
    </TabsContent>
  );
}
