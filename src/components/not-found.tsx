import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
      <p className="mb-4">
        Sorry, the post you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link href="/" aria-label="Go back to home page">
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
}
