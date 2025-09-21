import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface Post {
  id: string;
  displayName: string;
  kasi: string;
  content: string;
  section: string;
  timestamp: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  displayName: string;
  content: string;
  timestamp: Date;
}

interface PostCardProps {
  post: Post;
  onAddComment: (postId: string, comment: Omit<Comment, 'id'>) => void;
}

const PostCard = ({ post, onAddComment }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commenterName, setCommenterName] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commenterName.trim() || !commentText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and comment.",
        variant: "destructive"
      });
      return;
    }

    onAddComment(post.id, {
      displayName: commenterName.trim(),
      content: commentText.trim(),
      timestamp: new Date()
    });

    setCommentText("");
    setCommenterName("");
    
    toast({
      title: "Comment Added!",
      description: "Your comment has been posted.",
    });
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
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
                {post.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{post.displayName}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{post.kasi}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(post.timestamp)}</span>
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
            {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
          </Button>
        </div>
        
        {showComments && (
          <div className="mt-4 space-y-4">
            {/* Existing Comments */}
            {post.comments.map((comment) => (
              <div key={comment.id} className="bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-kasi-sky rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {comment.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-sm">{comment.displayName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(comment.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-foreground">{comment.content}</p>
              </div>
            ))}
            
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
                className="bg-kasi-sky hover:opacity-90 text-white"
              >
                Reply
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
