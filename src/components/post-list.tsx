'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, ChevronRight } from 'lucide-react'

interface Post {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  date: string
  _embedded?: {
    author: Array<{
      name: string
      avatar_urls: { [key: string]: string }
    }>
  }
}

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('https://hushen.c1.biz/wp-json/wp/v2/posts?_embed')
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts')
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Unable to load posts</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/post/${post.id}`}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title.rendered}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(new Date(post.date), 'MMM d, yyyy')}
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="line-clamp-3 text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                />
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="ml-auto group">
                  Read more
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

