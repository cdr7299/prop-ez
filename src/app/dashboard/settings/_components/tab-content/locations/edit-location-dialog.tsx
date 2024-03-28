import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { AddLocationForm } from "./add-location-form";

export function EditLocationDialog({
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
  onEdit: (args: { name: string }) => void;
  isUpdating: boolean;
  data: {
    id: string;
    name: string;
  }[];
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
        <AddLocationForm
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
