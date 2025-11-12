import React, { createContext, useContext, useState, useEffect } from 'react';
import { currentUser, populateUserData } from '../data/mockData';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate authentication with mock data
        const initializeAuth = async () => {
            // Check if we have a stored session
            const storedUser = localStorage.getItem('instagram_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                // For demo purposes, auto-login with mock user
                setUser(currentUser);
                localStorage.setItem('instagram_user', JSON.stringify(currentUser));
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const signUp = async (email, password, userData) => {
        try {
            // Create mock user
            const newUser = {
                ...currentUser,
                username: userData.username,
                full_name: userData.fullName,
                email: email
            };

            setUser(newUser);
            localStorage.setItem('instagram_user', JSON.stringify(newUser));

            return { data: { user: newUser }, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    const signIn = async (email, password) => {
        try {
            // For demo, any credentials work
            const demoUser = {
                ...currentUser,
                email: email
            };

            setUser(demoUser);
            localStorage.setItem('instagram_user', JSON.stringify(demoUser));

            return { data: { user: demoUser }, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    const signOut = async () => {
        setUser(null);
        localStorage.removeItem('instagram_user');
        return { error: null };
    };

    const value = {
        user,
        signUp,
        signIn,
        signOut,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}