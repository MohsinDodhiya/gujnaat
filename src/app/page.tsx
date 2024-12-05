import { Suspense } from "react";
import { PostList } from "@/components/post-list";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Naat Sarif</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover our latest Naat Sarif and Qalam
          </p>
        </div>
        <PostList />
      </div>
    </main>
  );
}
