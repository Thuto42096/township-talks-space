import { useState } from "react";
import PostForm from "./PostForm";
import PostCard, { Post, Comment } from "./PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface ForumSectionProps {
  section: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  kasiName?: string;
}

const ForumSection = ({ section, title, description, icon, kasiName }: ForumSectionProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleAddPost = (newPost: {
    displayName: string;
    kasi: string;
    content: string;
    section: string;
    timestamp: Date;
  }) => {
    const post: Post = {
      id: Date.now().toString(),
      ...newPost,
      comments: []
    };
    setPosts([post, ...posts]);
  };

  const handleAddComment = (postId: string, newComment: Omit<Comment, 'id'>) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { ...newComment, id: Date.now().toString() }]
        };
      }
      return post;
    }));
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
          {posts.length === 0 ? (
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
                onAddComment={handleAddComment}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumSection;