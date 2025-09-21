import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      kasis: {
        Row: {
          id: string
          name: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          display_name: string
          kasi: string
          content: string
          section: string
          created_at: string
        }
        Insert: {
          id?: string
          display_name: string
          kasi: string
          content: string
          section: string
          created_at?: string
        }
        Update: {
          id?: string
          display_name?: string
          kasi?: string
          content?: string
          section?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          display_name: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          display_name: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          display_name?: string
          content?: string
          created_at?: string
        }
      }
    }
  }
}
