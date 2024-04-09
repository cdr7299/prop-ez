import DotLoader from "~/components/dot-loader";
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

export default function AlertDialogDeleteBroker({
  open,
  setOpen,
  onDelete,
  isDeleting,
  count,
}: {
  open: boolean;
  setOpen: (args: boolean) => void;
  onDelete: () => void;
  isDeleting: boolean;
  count: number;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive/80 hover:bg-destructive"
            onClick={onDelete}
          >
            {!isDeleting && `Delete Multiple Brokers(${count})`}
            {isDeleting && <DotLoader />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
