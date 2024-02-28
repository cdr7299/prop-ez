import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { AddItemForm } from "./add-item-form";

export function AddItemDialog({
  open,
  setOpen,
  title,
  onAdd,
  isAdding,
}: {
  open: boolean;
  setOpen: (args: boolean) => void;
  title: string;
  onAdd: (args: { name: string }) => void;
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
        <AddItemForm onSubmit={onAdd} isAdding={isAdding} />
      </DialogContent>
    </Dialog>
  );
}
