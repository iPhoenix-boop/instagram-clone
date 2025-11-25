import React, { createContext, useState, useContext, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile as updateFirebaseProfile,
    sendEmailVerification,
    sendPasswordResetEmail,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signUp = async (email, password, displayName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (displayName) {
                await updateFirebaseProfile(user, { displayName });
            }

            await sendEmailVerification(user);
            return { success: true, user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updateProfile = async (updates) => {
        try {
            await updateFirebaseProfile(auth.currentUser, updates);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const uploadAvatar = async (file) => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('No user logged in');

            const storageRef = ref(storage, `avatars/${user.uid}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            await updateFirebaseProfile(user, { photoURL: downloadURL });
            return { success: true, photoURL: downloadURL };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const resendConfirmationEmail = async () => {
        try {
            await sendEmailVerification(auth.currentUser);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        loading,
        signUp,
        signIn,
        signOut: signOutUser,
        updateProfile,
        uploadAvatar,
        resendConfirmationEmail,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;




