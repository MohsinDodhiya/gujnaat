"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleCategorySelect = (value: string) => {
    router.push(`/category/${value}`);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-bold">
            નાત શરીફ
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-4 py-4">
            <div className="px-2 py-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    શ્રેણી પસંદ કરો
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onSelect={() => handleCategorySelect("aaka")}
                    >
                      આકા
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleCategorySelect("duaa")}
                    >
                      દુઆ
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleCategorySelect("gaush")}
                    >
                      ગૌસ-એ-પાક
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleCategorySelect("hamd")}
                    >
                      હમ્દ
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleCategorySelect("imam")}
                    >
                      ઈમામ-એ-હુસૈન
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleCategorySelect("khwaja")}
                    >
                      ખ્વાજા ગરીબ નવાઝ
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleCategorySelect("mnqabat")}
                    >
                      મનકબત
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleCategorySelect("moula")}
                    >
                      મૌલા અલી
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleCategorySelect("naat")}
                    >
                      નાત
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleCategorySelect("salami")}
                    >
                      સલામી
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link
              href="/latest-naats"
              onClick={() => setOpen(false)}
              className="block px-2 py-1 text-lg"
            >
              નવીનતમ નાત
            </Link>
            <Link
              href="/popular-naats"
              onClick={() => setOpen(false)}
              className="block px-2 py-1 text-lg"
            >
              લોકપ્રિય નાત
            </Link>
            <Link
              href="/categories"
              onClick={() => setOpen(false)}
              className="block px-2 py-1 text-lg"
            >
              શ્રેણીઓ
            </Link>
            <Link
              href="/authors"
              onClick={() => setOpen(false)}
              className="block px-2 py-1 text-lg"
            >
              લેખકો
            </Link>
            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
              className="block px-2 py-1 text-lg"
            >
              પસંદગી
            </Link>
            <div className="border-t pt-4">
              <div className="flex flex-col space-y-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  લૉગિન
                </Button>
                <Button onClick={() => setOpen(false)}>નાત સબમિટ કરો</Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
