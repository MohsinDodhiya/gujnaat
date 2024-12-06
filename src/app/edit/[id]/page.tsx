'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import { PostForm } from '@/components/post-form'
import { fetchPost } from '../../../../utils/api'

// Define the type for a WordPress post
type WordPressPost = {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [post, setPost] = useState<WordPressPost | null>(null)

  useEffect(() => {
    fetchPost(parseInt(resolvedParams.id)).then(setPost)
  }, [resolvedParams.id])

  if (!post) return <div>Loading...</div>

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <PostForm
        id={post.id}
        initialTitle={post.title.rendered}
        initialContent={post.content.rendered}
      />
    </main>
  )
}
