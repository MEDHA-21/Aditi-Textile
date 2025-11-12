import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Listen to Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || userDoc.data()?.displayName || 'User',
                    photoURL: firebaseUser.photoURL || userDoc.data()?.photoURL || null
                };
                
                setUser(userData);
                setIsAuthenticated(true);
                
                // Load user's wishlist and cart from Firestore
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setWishlist(data.wishlist || []);
                    setCart(data.cart || []);
                }
            } else {
                // User is signed out
                setUser(null);
                setIsAuthenticated(false);
                
                // Load guest wishlist and cart from localStorage
                const guestWishlist = localStorage.getItem('guest_wishlist');
                const guestCart = localStorage.getItem('guest_cart');
                if (guestWishlist) setWishlist(JSON.parse(guestWishlist));
                if (guestCart) setCart(JSON.parse(guestCart));
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Sign up with email and password
    const signUp = async (email, password, displayName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Update profile with display name
            await updateProfile(user, { displayName });
            
            // Create user document in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: displayName,
                createdAt: new Date(),
                wishlist: [],
                cart: [],
                orders: []
            });
            
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Sign in with email and password
    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowLoginModal(false);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            
            // Check if user document exists, create if not
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: new Date(),
                    wishlist: [],
                    cart: [],
                    orders: []
                });
            }
            
            setShowLoginModal(false);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Legacy login function (for backward compatibility)
    const login = (userData) => {
        // This is kept for compatibility with non-Firebase parts
        setUser(userData);
        setIsAuthenticated(true);
        setShowLoginModal(false);
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setWishlist([]);
            setCart([]);
            
            // Load guest data
            const guestWishlist = localStorage.getItem('guest_wishlist');
            const guestCart = localStorage.getItem('guest_cart');
            if (guestWishlist) setWishlist(JSON.parse(guestWishlist));
            if (guestCart) setCart(JSON.parse(guestCart));
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const openLoginModal = () => {
        setShowLoginModal(true);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const addToWishlist = async (item) => {
        const updatedWishlist = [...wishlist, item];
        setWishlist(updatedWishlist);
        
        if (isAuthenticated && user) {
            // Save to Firestore
            try {
                await updateDoc(doc(db, 'users', user.uid), {
                    wishlist: updatedWishlist
                });
            } catch (error) {
                console.error('Error updating wishlist:', error);
            }
        } else {
            // Save to localStorage for guests
            localStorage.setItem('guest_wishlist', JSON.stringify(updatedWishlist));
        }
    };

    const removeFromWishlist = async (itemId) => {
        const updatedWishlist = wishlist.filter(item => item.id !== itemId);
        setWishlist(updatedWishlist);
        
        if (isAuthenticated && user) {
            // Save to Firestore
            try {
                await updateDoc(doc(db, 'users', user.uid), {
                    wishlist: updatedWishlist
                });
            } catch (error) {
                console.error('Error updating wishlist:', error);
            }
        } else {
            // Save to localStorage for guests
            localStorage.setItem('guest_wishlist', JSON.stringify(updatedWishlist));
        }
    };

    const isInWishlist = (itemId) => {
        return wishlist.some(item => item.id === itemId);
    };

    const addToCart = async (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        let updatedCart;
        
        if (existingItem) {
            updatedCart = cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
                    : cartItem
            );
        } else {
            updatedCart = [...cart, { ...item, quantity: item.quantity || 1 }];
        }
        
        setCart(updatedCart);
        
        if (isAuthenticated && user) {
            try {
                await updateDoc(doc(db, 'users', user.uid), {
                    cart: updatedCart
                });
            } catch (error) {
                console.error('Error updating cart:', error);
            }
        } else {
            localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
        }
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        signUp,
        signIn,
        signInWithGoogle,
        showLoginModal,
        openLoginModal,
        closeLoginModal,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cart,
        addToCart,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
