import { createClient } from '@supabase/supabase-js'

// Environment variables шалгах
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate
if (!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NODE_ENV === 'production') {
  console.warn('⚠️  Supabase URL not configured for production')
}

// Server-side Supabase client with admin privileges
// Row Level Security (RLS) bypass хийнэ
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})