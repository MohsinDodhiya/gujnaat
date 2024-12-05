"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createPost, updatePost } from '../../utils/api'

interface PostFormProps {
  id?: number
  initialTitle?: string
  initialContent?: string
}

export function PostForm({ id, initialTitle = '', initialContent = '' }: PostFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (id) {
      await updatePost(id, title, content)
    } else {
      await createPost(title, content)
    }
    router.push('/')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? 'Edit Post' : 'Create New Post'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{id ? 'Update' : 'Create'}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

