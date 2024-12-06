"use client";

import { useState, useEffect } from "react";
import { PostForm } from "@/components/post-form";
import { fetchPost } from "../../../../utils/api";

// Define the type for a WordPress post
type WordPressPost = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<WordPressPost | null>(null);

  // Effect to load the post
  useEffect(() => {
    const fetchData = async () => {
      const postId = parseInt(params.id);
      const fetchedPost = await fetchPost(postId);
      setPost(fetchedPost);
    };

    fetchData();
  }, [params.id]); // Re-fetch if the ID changes

  if (!post) return <div>Loading...</div>;

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <PostForm
        id={post.id}
        initialTitle={post.title.rendered}
        initialContent={post.content.rendered}
      />
    </main>
  );
}
