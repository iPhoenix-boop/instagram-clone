import { createClient } from '@supabase/supabase-js'

// REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS
const supabaseUrl = 'https://sufiuztjkfpkuavesqnn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1Zml1enRqa2Zwa3VhdmVzcW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0ODgyMzQsImV4cCI6MjA3ODA2NDIzNH0.aq2p_V7Hh0zwuAlEgRvCLJndAAJ7gIRFxdXq_fVK3V0'

export const supabase = createClient(supabaseUrl, supabaseKey)