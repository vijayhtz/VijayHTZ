import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthContextType {
    user: User | null;
    userProfile: any | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("Auth state changed, user:", currentUser?.uid);
            setUser(currentUser);

            if (currentUser) {
                // Fetch user profile from Firestore
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        setUserProfile(userDoc.data());
                    } else {
                        console.warn("No Firestore profile for user:", currentUser.uid);
                        // Provide a basic fallback profile
                        setUserProfile({
                            name: currentUser.displayName || 'Guest User',
                            email: currentUser.email,
                            role: 'user'
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            } else {
                setUserProfile(null);
            }

            setLoading(false);
            console.log("Auth loading state cleared");
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userProfile, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
