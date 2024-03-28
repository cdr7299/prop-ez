import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { AddCategoryForm } from "./add-category-form";
import { type CategoryWithConfig } from "~/server/types/categories.types";
import { type CategoryFormSchema } from "./categories.types";

export function EditCategoryDialog({
  open,
  setOpen,
  title,
  onEdit,
  isUpdating,
  data,
  editDataId,
}: {
  open: boolean;
  setOpen: (args: boolean) => void;
  title: string;
  onEdit: (args: CategoryFormSchema) => void;
  isUpdating: boolean;
  data: Array<CategoryWithConfig>;
  editDataId: string;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit {title}</DialogTitle>
          <DialogDescription>
            Edit {title} here, press submit to save it.
          </DialogDescription>
        </DialogHeader>
        <AddCategoryForm
          data={data}
          editDataId={editDataId}
          onSubmit={onEdit}
          isAdding={isUpdating}
          isEditMode
        />
      </DialogContent>
    </Dialog>
  );
}
