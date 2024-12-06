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

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [postId, setPostId] = useState<number | null>(null);
  const [post, setPost] = useState<WordPressPost | null>(null);

  // Resolve the promise and set the postId
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      const id = parseInt(resolvedParams.id, 10); // Convert id to number
      if (!isNaN(id)) {
        setPostId(id);
      } else {
        console.error("Invalid post ID");
      }
    };

    resolveParams();
  }, [params]);

  // Fetch the post once postId is available
  useEffect(() => {
    if (postId !== null) {
      const fetchData = async () => {
        try {
          const fetchedPost = await fetchPost(postId);
          setPost(fetchedPost);
        } catch (error) {
          console.error("Error fetching the post:", error);
        }
      };

      fetchData();
    }
  }, [postId]);

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
