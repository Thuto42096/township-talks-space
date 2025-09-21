import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, MapPin, Clock, Loader2 } from "lucide-react";
import { useComments, useCreateComment } from "@/hooks/usePosts";
import { useRealtimeComments } from "@/hooks/useRealtime";
import { type Post } from "@/lib/api";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commenterName, setCommenterName] = useState("");

  // Use React Query hooks for comments
  const { data: comments = [], isLoading: commentsLoading } = useComments(post.id);
  const createCommentMutation = useCreateComment();

  // Enable real-time updates for comments when comments are shown
  useRealtimeComments(showComments ? post.id : '');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!commenterName.trim() || !commentText.trim()) {
      return;
    }

    createCommentMutation.mutate({
      post_id: post.id,
      display_name: commenterName.trim(),
      content: commentText.trim(),
    });

    setCommentText("");
    setCommenterName("");
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="shadow-soft border-kasi-earth/20 hover:shadow-warm transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-community rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {post.display_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{post.display_name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{post.kasi}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(post.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-foreground leading-relaxed mb-4">{post.content}</p>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="text-muted-foreground hover:text-primary"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {post.comment_count || 0} {(post.comment_count || 0) === 1 ? 'comment' : 'comments'}
          </Button>
        </div>

        {showComments && (
          <div className="mt-4 space-y-4">
            {/* Existing Comments */}
            {commentsLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">Loading comments...</span>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-kasi-sky rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {comment.display_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-sm">{comment.display_name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{comment.content}</p>
                </div>
              ))
            )}
            
            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="space-y-3 pt-3 border-t border-kasi-earth/20">
              <div className="grid md:grid-cols-2 gap-3">
                <Input
                  placeholder="Your name"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="border-kasi-earth/30 focus:border-primary"
                />
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="border-kasi-earth/30 focus:border-primary"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={createCommentMutation.isPending}
                className="bg-kasi-sky hover:opacity-90 text-white disabled:opacity-50"
              >
                {createCommentMutation.isPending ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Posting...
                  </>
                ) : (
                  'Reply'
                )}
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
