import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { AddPropertyForm } from "./add-property-form";
import { api } from "~/trpc/server";

export async function AddProperty() {
  const categories = await api.categories.list.query();
  const locations = await api.locations.list.query();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Property</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>
            Add a new property here, press submit to save it.
          </DialogDescription>
        </DialogHeader>
        <AddPropertyForm categories={categories} locations={locations} />
      </DialogContent>
    </Dialog>
  );
}
