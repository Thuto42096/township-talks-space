import { getSupabaseClient, supabase } from './supabase'

// Utility function to format kasi names consistently
export const formatKasiName = (kasiName: string): string => {
  return kasiName.charAt(0).toUpperCase() + kasiName.slice(1).toLowerCase()
}

// Types matching our database schema
export interface Post {
  id: string
  display_name: string
  kasi: string
  content: string
  section: string
  created_at: string
  comment_count?: number
}

export interface Comment {
  id: string
  post_id: string
  display_name: string
  content: string
  created_at: string
}

export interface Kasi {
  id: string
  name: string
  description: string
  created_at: string
}

// API functions for posts
export const postsApi = {
  // Get all posts or filter by kasi/section
  async getPosts(kasi?: string, section?: string): Promise<Post[]> {
    const sb = getSupabaseClient()

    let query = sb
      .from('posts')
      .select(`
        id,
        display_name,
        kasi,
        content,
        section,
        created_at,
        comments(count)
      `)
      .order('created_at', { ascending: false })

    if (kasi) {
      // Format kasi name to match database format
      const formattedKasi = formatKasiName(kasi)
      query = query.eq('kasi', formattedKasi)
    }

    if (section) {
      query = query.eq('section', section)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching posts:', error)
      throw error
    }

    // Transform the data to include comment count
    return data?.map(post => ({
      ...post,
      comment_count: post.comments?.[0]?.count || 0
    })) || []
  },

  // Create a new post
  async createPost(post: Omit<Post, 'id' | 'created_at' | 'comment_count'>): Promise<Post> {
    const sb = getSupabaseClient()

    const { data, error } = await sb
      .from('posts')
      .insert([post])
      .select()
      .single()

    if (error) {
      console.error('Error creating post:', error)
      throw error
    }

    return { ...data, comment_count: 0 }
  },

  // Get a single post by ID
  async getPost(id: string): Promise<Post | null> {
    const sb = getSupabaseClient()

    const { data, error } = await sb
      .from('posts')
      .select(`
        id,
        display_name,
        kasi,
        content,
        section,
        created_at,
        comments(count)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching post:', error)
      return null
    }

    return {
      ...data,
      comment_count: data.comments?.[0]?.count || 0
    }
  }
}

// API functions for comments
export const commentsApi = {
  // Get comments for a specific post
  async getComments(postId: string): Promise<Comment[]> {
    const sb = getSupabaseClient()

    const { data, error } = await sb
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching comments:', error)
      throw error
    }

    return data || []
  },

  // Create a new comment
  async createComment(comment: Omit<Comment, 'id' | 'created_at'>): Promise<Comment> {
    const sb = getSupabaseClient()

    const { data, error } = await sb
      .from('comments')
      .insert([comment])
      .select()
      .single()

    if (error) {
      console.error('Error creating comment:', error)
      throw error
    }

    return data
  }
}

// API functions for kasis
export const kasisApi = {
  // Get all kasis
  async getKasis(): Promise<Kasi[]> {
    const sb = getSupabaseClient()

    const { data, error } = await sb
      .from('kasis')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching kasis:', error)
      throw error
    }

    return data || []
  },

  // Get a single kasi by name
  async getKasi(name: string): Promise<Kasi | null> {
    if (!supabase) {
      console.warn('Supabase not available, cannot fetch kasi')
      return null
    }

    const { data, error } = await supabase
      .from('kasis')
      .select('*')
      .eq('name', name)
      .single()

    if (error) {
      console.error('Error fetching kasi:', error)
      return null
    }

    return data
  },

  // Create a new kasi
  async createKasi(kasi: Omit<Kasi, 'id' | 'created_at'>): Promise<Kasi> {
    if (!supabase) {
      console.warn('Supabase not available, cannot create kasi')
      throw new Error('Database not available')
    }

    const { data, error } = await supabase
      .from('kasis')
      .insert([kasi])
      .select()
      .single()

    if (error) {
      console.error('Error creating kasi:', error)
      throw error
    }

    return data
  }
}

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to new posts
  subscribeToPosts(callback: (post: Post) => void, kasi?: string, section?: string) {
    if (!supabase) {
      console.warn('Supabase not available, real-time subscriptions disabled')
      return () => {} // Return empty unsubscribe function
    }

    // Format kasi name for consistent filtering
    const formattedKasi = kasi ? formatKasiName(kasi) : undefined

    const channelName = `posts:${formattedKasi ?? 'all'}:${section ?? 'all'}`

    const channel = supabase
      .channel(channelName)
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
          filter: formattedKasi ? `kasi=eq.${formattedKasi}` : undefined
        },
        (payload) => {
          const newPost = payload.new as Post
          if (!section || newPost.section === section) {
            callback({ ...newPost, comment_count: 0 })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  },

  // Subscribe to new comments for a specific post
  subscribeToComments(postId: string, callback: (comment: Comment) => void) {
    if (!supabase) {
      console.warn('Supabase not available, real-time subscriptions disabled')
      return () => {}
    }

    const channel = supabase
      .channel(`comments-${postId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'comments',
          filter: `post_id=eq.${postId}`
        }, 
        (payload) => {
          callback(payload.new as Comment)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }
}
