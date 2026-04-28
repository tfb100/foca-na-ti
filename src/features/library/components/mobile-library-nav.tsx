"use client";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LayoutGrid } from "lucide-react";
import { LibrarySidebar } from "./library-sidebar";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  parentId?: string | null;
}

interface MobileLibraryNavProps {
  categories: Category[];
  activeSlug?: string;
}

export function MobileLibraryNav({ categories, activeSlug }: MobileLibraryNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden gap-2 border-primary/20 bg-primary/5 text-primary">
          <Menu className="h-4 w-4" />
          Categorias
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 border-r border-border bg-background w-[300px]">
        <SheetHeader className="p-6 border-b border-border text-left">
          <SheetTitle className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <span className="font-black uppercase tracking-tighter">Biblioteca de TI</span>
          </SheetTitle>
        </SheetHeader>
        <div className="h-[calc(100vh-80px)]" onClick={() => setOpen(false)}>
           <LibrarySidebar categories={categories} activeSlug={activeSlug} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
