"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { useState } from "react";

export const MobileSidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100] w-[256px]" side="left">
        <SheetTitle></SheetTitle>
        <Sidebar onPress={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
