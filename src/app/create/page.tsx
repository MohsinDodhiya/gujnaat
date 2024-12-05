import { PostForm } from '@/components/post-form'

export default function CreatePostPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <PostForm />
    </main>
  )
}

