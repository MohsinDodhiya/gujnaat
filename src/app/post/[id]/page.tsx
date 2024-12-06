import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";

// Define the type for a WordPress post
type WordPressPost = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string; // Added the `date` field
};

// Update the type for PageProps with params
type PageProps = {
  params: { id: string };
};

export default function PostPage({ params }: PageProps) {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadPost() {
      try {
        const response = await fetch(
          `https://hushen.c1.biz/wp-json/wp/v2/posts/${params.id}?_embed`
        );
        if (!response.ok) throw new Error("Failed to fetch post");
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch post");
        throw err;
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4 mt-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-xl font-semibold mb-2">Unable to load post</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => router.push("/")}>Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          className="mb-4 group"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Posts
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{post.title.rendered}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-4">
              <Calendar className="mr-2 h-4 w-4" />
              {format(new Date(post.date), "MMMM d, yyyy")}
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
