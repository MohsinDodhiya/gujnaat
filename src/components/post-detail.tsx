import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Author {
  name: string;
  avatar_urls: { [size: string]: string };
}

interface Comment {
  id: number;
  author_name: string;
  date: string;
  content: { rendered: string };
}

interface Post {
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  author?: Author;
  comments?: Comment[];
}

interface PostDetailProps {
  post: Post | null;
}

export function PostDetail({ post }: PostDetailProps) {
  if (!post) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load post details.</AlertDescription>
      </Alert>
    );
  }

  const { title, content, date, author, comments } = post;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title.rendered}</CardTitle>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={author?.avatar_urls?.["48"]}
              alt={`${author?.name || "User"}'s avatar`}
            />
            <AvatarFallback>{author?.name?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <span>{author?.name || "Unknown Author"}</span>
          <span>•</span>
          <time dateTime={date}>{format(new Date(date), "MMMM d, yyyy")}</time>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content.rendered }}
        />
      </CardContent>
      {comments && comments.length > 0 ? (
        <CardFooter className="flex flex-col items-start">
          <Separator className="my-4" />
          <h3 className="text-lg font-semibold mb-2">
            Comments ({comments.length})
          </h3>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4 w-full">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{comment.author_name}</span>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(comment.date), "MMM d, yyyy")}
                </span>
              </div>
              <div
                className="mt-1 text-sm"
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
              />
            </div>
          ))}
        </CardFooter>
      ) : (
        <CardFooter>
          <Separator className="my-4" />
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        </CardFooter>
      )}
    </Card>
  );
}
