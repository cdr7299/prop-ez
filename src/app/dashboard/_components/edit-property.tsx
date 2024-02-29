import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { AddPropertyForm } from "./add-property/add-property-form";
import {
  type Locations,
  type Category,
  type BrokerEntity,
  type PropertyItem,
} from "@prisma/client";

export function EditProperty({
  categories,
  locations,
  brokers,
  properties,
  editPropertyId,
  open,
  setOpen,
}: {
  categories: Category[];
  locations: Locations[];
  brokers: BrokerEntity[];
  properties: PropertyItem[];
  editPropertyId: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>Press submit to save it.</DialogDescription>
        </DialogHeader>
        <AddPropertyForm
          categories={categories}
          locations={locations}
          brokers={brokers}
          setOpen={setOpen}
          properties={properties}
          editPropertyId={editPropertyId}
          isEditMode
        />
      </DialogContent>
    </Dialog>
  );
}
