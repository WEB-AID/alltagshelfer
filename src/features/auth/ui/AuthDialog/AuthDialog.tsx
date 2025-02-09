"use client";

import { useState } from "react";
import { RegisterTabs } from "../RegisterTabs/RegisterTabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AuthDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login or Register</Button>
      </DialogTrigger>
      <DialogContent className="w-min">
        <DialogHeader>
          <DialogTitle>Login or Register</DialogTitle>
          <DialogDescription>
            Provide more functionality for usage.
          </DialogDescription>
        </DialogHeader>
        <RegisterTabs onSuccess={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
