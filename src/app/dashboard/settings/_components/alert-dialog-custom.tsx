import { type PropertyItem } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function AlertDialogCustom({
  open,
  setOpen,
  affectedProperties = [],
  selectedItemName,
  onDelete,
}: {
  open: boolean;
  setOpen: (args: boolean) => void;
  affectedProperties: PropertyItem[];
  selectedItemName: string;
  onDelete: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-bold text-accent">{selectedItemName}</span>{" "}
            and the following properties which are linked to it:
            <div className="sticky top-0 my-2 flex justify-between px-4">
              <span className="font-extrabold underline">Title</span>
              <span className="font-extrabold underline">Address</span>
            </div>
            <ScrollArea className="mt-2 h-[200px] w-full rounded-md border p-2 px-3">
              <div className="flex flex-col">
                {affectedProperties.map((property) => (
                  <div key={property.id} className="flex justify-between gap-2">
                    <span>{property.title}</span>
                    <span>{property.address}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive/80 hover:bg-destructive"
            onClick={onDelete}
          >
            Delete {selectedItemName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
