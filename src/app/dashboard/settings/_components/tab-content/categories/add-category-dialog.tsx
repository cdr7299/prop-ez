import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { AddCategoryForm } from "./add-category-form";
import { type CategoryFormSchema } from "./categories.types";

export function AddCategoryDialog({
  open,
  setOpen,
  title,
  onAdd,
  isAdding,
}: {
  open: boolean;
  setOpen: (args: boolean) => void;
  title: string;
  onAdd: (args: CategoryFormSchema) => void;
  isAdding: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New {title}</DialogTitle>
          <DialogDescription>
            Add new {title} here, press submit to save it.
          </DialogDescription>
        </DialogHeader>
        <AddCategoryForm onSubmit={onAdd} isAdding={isAdding} />
      </DialogContent>
    </Dialog>
  );
}
