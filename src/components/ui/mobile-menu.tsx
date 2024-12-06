'use client'

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

export function MobileMenu() {
  const [open, setOpen] = React.useState(false)

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
          <SheetTitle className="text-left text-lg font-bold">નાત શરીફ</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-4 py-4">
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
  )
}

