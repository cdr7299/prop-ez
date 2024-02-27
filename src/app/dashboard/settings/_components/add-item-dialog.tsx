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
  data,
}: {
  open: boolean;
  setOpen: (args: boolean) => void;
  title: string;
  onAdd: (args: { name: string }) => void;
  data: {
    id: string;
    name: string;
  }[];
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
        <AddItemForm data={data} onSubmit={onAdd} />
      </DialogContent>
    </Dialog>
  );
}
