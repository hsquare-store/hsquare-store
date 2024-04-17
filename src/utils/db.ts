
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

export const db: SupabaseClient = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
)
