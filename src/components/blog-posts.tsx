"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
}

export function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://hushen.c1.biz/wp-json/wp/v2/posts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(
          "An error occurred while fetching the posts. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title.rendered}</CardTitle>
            <CardDescription>
              {new Date(post.date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              className="line-clamp-3"
            />
          </CardContent>
          <CardFooter>
            <Badge variant="secondary">
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                વધુ વાંચો
              </a>
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
