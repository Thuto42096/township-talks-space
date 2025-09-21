import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { subscriptions } from '@/lib/api'
import { QUERY_KEYS } from './usePosts'

// Hook for real-time posts updates
export const useRealtimePosts = (kasi?: string, section?: string) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const unsubscribe = subscriptions.subscribeToPosts(
      (newPost) => {
        // Invalidate and refetch posts queries to include the new post
        queryClient.invalidateQueries({ 
          queryKey: QUERY_KEYS.posts(kasi, section) 
        })
        
        // Also invalidate broader queries that might include this post
        queryClient.invalidateQueries({ queryKey: ['posts'] })
      },
      kasi,
      section
    )

    return unsubscribe
  }, [queryClient, kasi, section])
}

// Hook for real-time comments updates
export const useRealtimeComments = (postId: string) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!postId) return

    const unsubscribe = subscriptions.subscribeToComments(
      postId,
      (newComment) => {
        // Invalidate comments for this specific post
        queryClient.invalidateQueries({ 
          queryKey: QUERY_KEYS.comments(postId) 
        })
        
        // Also invalidate posts queries to update comment counts
        queryClient.invalidateQueries({ queryKey: ['posts'] })
      }
    )

    return unsubscribe
  }, [queryClient, postId])
}
