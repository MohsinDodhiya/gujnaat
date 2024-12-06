"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

export function LessonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-none text-white">
        <CardHeader>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="SEARCH"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
            />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            hello!
            <br />
            lorem ipsum
          </h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-pink-500 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Today's lesson</h3>
            <Button className="bg-white text-pink-500 hover:bg-white/90">
              GET STARTED
            </Button>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">NEXT LESSON</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                <span>LOREM IPSUM CONTINUE</span>
                <span className="bg-cyan-400 px-2 py-1 rounded text-sm font-bold">50%</span>
              </div>
              <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                <span>LOREM IPSUM CONTINUE</span>
                <span className="bg-purple-400 px-2 py-1 rounded text-sm font-bold">20%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

