import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.'
  )
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

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
