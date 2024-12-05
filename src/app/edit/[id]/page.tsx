'use client'

import { useState, useEffect } from 'react'
import { PostForm } from '@/components/post-form'
import { fetchPost } from '../../../../utils/api'

// Define a type for your Post object
type Post = {
  id: number
  title: { rendered: string }
  content: { rendered: string }
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const postId = parseInt(params.id, 10)
    fetchPost(postId).then((data) => setPost(data))
  }, [params.id])

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
