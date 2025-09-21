import PostForm from "./PostForm";
import PostCard from "./PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Loader2 } from "lucide-react";
import { usePosts, useCreatePost } from "@/hooks/usePosts";
import { useRealtimePosts } from "@/hooks/useRealtime";
import { type Post } from "@/lib/api";

interface ForumSectionProps {
  section: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  kasiName?: string;
}

const ForumSection = ({ section, title, description, icon, kasiName }: ForumSectionProps) => {
  // Use React Query hooks for data fetching
  const { data: posts = [], isLoading, error } = usePosts(kasiName, section);
  const createPostMutation = useCreatePost();

  // Enable real-time updates
  useRealtimePosts(kasiName, section);

  const handleAddPost = (newPost: {
    displayName: string;
    kasi: string;
    content: string;
    section: string;
    timestamp: Date;
  }) => {
    // Transform the data to match our API interface
    createPostMutation.mutate({
      display_name: newPost.displayName,
      kasi: newPost.kasi,
      content: newPost.content,
      section: newPost.section,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Section Header */}
        <Card className="mb-8 shadow-warm border-kasi-earth/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-sunset rounded-lg flex items-center justify-center">
                {icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">
                  {kasiName ? `${kasiName.charAt(0).toUpperCase() + kasiName.slice(1)} - ${title}` : title}
                </h1>
                <p className="text-muted-foreground mt-1">{description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post Form */}
        <div className="mb-8">
          <PostForm section={section} onSubmit={handleAddPost} kasiName={kasiName} />
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {isLoading ? (
            <Card className="shadow-soft border-kasi-earth/20">
              <CardContent className="p-12 text-center">
                <Loader2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  Loading posts...
                </h3>
                <p className="text-muted-foreground">
                  Fetching the latest community updates
                </p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="shadow-soft border-kasi-earth/20">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-destructive mb-2">
                  Error loading posts
                </h3>
                <p className="text-muted-foreground">
                  Please check your connection and try again
                </p>
              </CardContent>
            </Card>
          ) : posts.length === 0 ? (
            <Card className="shadow-soft border-kasi-earth/20">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No posts yet
                </h3>
                <p className="text-muted-foreground">
                  Be the first to share something with your community!
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumSection;