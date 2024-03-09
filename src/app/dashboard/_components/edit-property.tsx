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

interface EditPropertyProps {
  categories: Category[];
  locations: Locations[];
  brokers: BrokerEntity[];
  properties: Array<PropertyItem>;
  editPropertyId: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export function EditProperty({
  categories,
  locations,
  brokers,
  properties,
  editPropertyId,
  open,
  setOpen,
}: EditPropertyProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="px-2 py-6 sm:max-w-[80%] sm:px-4 sm:py-6 xl:max-w-[70%] 2xl:max-w-[50%]">
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
