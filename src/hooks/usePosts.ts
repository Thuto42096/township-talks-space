import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi, commentsApi, type Post, type Comment } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

// Query keys
export const QUERY_KEYS = {
  posts: (kasi?: string, section?: string) => ['posts', kasi, section],
  comments: (postId: string) => ['comments', postId],
  kasis: () => ['kasis']
}

// Hook to fetch posts
export const usePosts = (kasi?: string, section?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.posts(kasi, section),
    queryFn: () => postsApi.getPosts(kasi, section),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Hook to create a new post
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post: Omit<Post, 'id' | 'created_at' | 'comment_count'>) => 
      postsApi.createPost(post),
    onSuccess: (newPost) => {
      // Invalidate and refetch posts queries
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      
      toast({
        title: "Post Created!",
        description: "Your post has been added to the community.",
      })
    },
    onError: (error) => {
      console.error('Error creating post:', error)
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      })
    }
  })
}

// Hook to fetch comments for a post
export const useComments = (postId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.comments(postId),
    queryFn: () => commentsApi.getComments(postId),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

// Hook to create a new comment
export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment: Omit<Comment, 'id' | 'created_at'>) => 
      commentsApi.createComment(comment),
    onSuccess: (newComment) => {
      // Invalidate comments for this post
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.comments(newComment.post_id) 
      })
      
      // Also invalidate posts to update comment counts
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      
      toast({
        title: "Comment Added!",
        description: "Your comment has been posted.",
      })
    },
    onError: (error) => {
      console.error('Error creating comment:', error)
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive"
      })
    }
  })
}
