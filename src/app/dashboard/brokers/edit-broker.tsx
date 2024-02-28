import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { AddBrokerForm } from "./add-broker-form";
import { type BrokerEntity } from "@prisma/client";

export function EditBroker({
  editBrokerId,
  open,
  setOpen,
  brokers,
}: {
  editBrokerId: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
  brokers: BrokerEntity[];
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Broker</DialogTitle>
          <DialogDescription>Press submit to save it.</DialogDescription>
        </DialogHeader>
        <AddBrokerForm
          brokers={brokers}
          setOpen={setOpen}
          isEditMode
          editBrokerId={editBrokerId}
        />
      </DialogContent>
    </Dialog>
  );
}
