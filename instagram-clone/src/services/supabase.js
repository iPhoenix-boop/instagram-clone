// Mock Supabase client for frontend-only operation
export const supabase = {
    auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signUp: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: (callback) => {
            // Mock subscription
            return {
                unsubscribe: () => { }
            };
        }
    }
};