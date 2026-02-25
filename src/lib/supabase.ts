import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

/**
 * Supabase client.
 *
 * IMPORTANT:
 * - Only use the anon/public key in the browser.
 * - Never expose the service_role key in frontend code.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        // This app is intentionally anonymous (no login).
        // Disable session features to reduce noise and avoid accidental auth flows.
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  : null

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (locally in .env.local or in Vercel Environment Variables).'
    )
  }
  return supabase
}

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    'Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (recommended: .env.local)'
  )
}

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
