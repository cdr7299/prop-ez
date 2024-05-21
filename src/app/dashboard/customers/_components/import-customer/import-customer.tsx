"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { DownloadIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function ImportCustomerFromGoogle() {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  async function onSubmit() {
    // await mutateAsync(values);
  }

  async function requestAdditonalScope() {
    await signIn(
      "google",
      {},
      {
        callbackUrl: "/dashboard/customers",
        scope: "https://www.googleapis.com/auth/contacts.readonly",
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-2">
          <Button variant="outline" className="items-center gap-2">
            <DownloadIcon />
            Import from Google
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="px-0 py-4 sm:h-auto sm:max-w-[50%] sm:py-6 xl:max-w-[40%] 2xl:max-w-[30%]">
        <DialogHeader className="justify-around gap-2 !space-y-0 border-b-[1px] border-b-primary px-4 py-2 sm:border-b-0 sm:py-0">
          <DialogTitle>Import from Gmail</DialogTitle>
          <DialogDescription>
            Add a new customer here, press submit to save it.
          </DialogDescription>
        </DialogHeader>
        <div className="m-2 flex h-[300px] items-center justify-center rounded-lg border">
          <Button variant="outline" onClick={requestAdditonalScope}>
            Allow access to Google Contacts
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
