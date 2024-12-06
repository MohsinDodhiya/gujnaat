"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

const categories = [
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
]

export function CategoryGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-none text-white">
        <CardHeader>
          <h2 className="text-3xl font-bold mb-4">
            Choose the category
            <br />
            you want to learn.
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="SEARCH"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className={`
                  aspect-video rounded-lg p-4 flex items-center justify-center
                  ${index === 3 ? 'bg-pink-500' : 'bg-white/10'}
                  hover:bg-white/20 transition-colors cursor-pointer
                `}>
                  <span className="font-medium">{category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

