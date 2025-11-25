import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://sufiuztjkfpkuavesqnn.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1Zml1enRqa2Zwa3VhdmVzcW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0ODgyMzQsImV4cCI6MjA3ODA2NDIzNH0.aq2p_V7Hh0zwuAlEgRvCLJndAAJ7gIRFxdXq_fVK3V0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce' // Keep as 'pkce' for better security
    }
})