'use client'

import * as React from "react"
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, BookOpen, Star, ChevronDown, Library, BookMarked, PenTool, Search } from 'lucide-react'
import { MobileMenu } from './ui/mobile-menu'
export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Handle hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch by not rendering until mounted
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">નાત શરીફ</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    બ્રાઉઝ કરો
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/latest-naats" className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        નવીનતમ નાત
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/popular-naats" className="flex items-center gap-2">
                        <Library className="h-4 w-4" />
                        લોકપ્રિય નાત
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/categories" className="flex items-center gap-2">
                        <BookMarked className="h-4 w-4" />
                        શ્રેણીઓ
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/authors" className="flex items-center gap-2">
                        <PenTool className="h-4 w-4" />
                        લેખકો
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">
                શોધ કરો
              </Link>
              
              <Link href="/favorites" className="text-muted-foreground hover:text-primary transition-colors">
                પસંદગી
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <form className="hidden lg:block relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="નાત શરીફ શોધો..."
                className="pl-8 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="mr-2"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">થીમ બદલો</span>
            </Button>

            <div className="hidden sm:flex gap-2">
              <Button variant="outline" size="sm">
                લૉગિન
              </Button>
              <Button variant="default" size="sm">
                નાત સબમિટ કરો
              </Button>
            </div>

            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}

