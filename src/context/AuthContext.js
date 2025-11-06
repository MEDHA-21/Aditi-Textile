import React, { createContext, useState, useContext, useEffect } from 'react';

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

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
            // Load user's saved wishlist
            const savedWishlist = localStorage.getItem('wishlist_' + JSON.parse(storedUser).email);
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }
        } else {
            // Load guest wishlist
            const guestWishlist = localStorage.getItem('guest_wishlist');
            if (guestWishlist) {
                setWishlist(JSON.parse(guestWishlist));
            }
        }
    }, []);

    const login = (userData) => {
        // Get guest wishlist before login
        const guestWishlist = localStorage.getItem('guest_wishlist');
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Replace guest wishlist with user's saved wishlist (or merge if needed)
        const savedWishlist = localStorage.getItem('wishlist_' + userData.email);
        if (savedWishlist) {
            // Use saved wishlist, discard guest wishlist
            setWishlist(JSON.parse(savedWishlist));
        } else if (guestWishlist) {
            // If no saved wishlist, use guest wishlist as user's wishlist
            const guestItems = JSON.parse(guestWishlist);
            setWishlist(guestItems);
            localStorage.setItem('wishlist_' + userData.email, JSON.stringify(guestItems));
        }
        
        // Clear guest wishlist
        localStorage.removeItem('guest_wishlist');
        setShowLoginModal(false);
    };

    const logout = () => {
        // Clear user wishlist when logging out
        setWishlist([]);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        
        // Load guest wishlist if exists
        const guestWishlist = localStorage.getItem('guest_wishlist');
        if (guestWishlist) {
            setWishlist(JSON.parse(guestWishlist));
        }
    };

    const openLoginModal = () => {
        setShowLoginModal(true);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const addToWishlist = (item) => {
        const updatedWishlist = [...wishlist, item];
        setWishlist(updatedWishlist);
        
        if (isAuthenticated) {
            localStorage.setItem('wishlist_' + user.email, JSON.stringify(updatedWishlist));
        } else {
            localStorage.setItem('guest_wishlist', JSON.stringify(updatedWishlist));
        }
    };

    const removeFromWishlist = (itemId) => {
        const updatedWishlist = wishlist.filter(item => item.id !== itemId);
        setWishlist(updatedWishlist);
        
        if (isAuthenticated) {
            localStorage.setItem('wishlist_' + user.email, JSON.stringify(updatedWishlist));
        } else {
            localStorage.setItem('guest_wishlist', JSON.stringify(updatedWishlist));
        }
    };

    const isInWishlist = (itemId) => {
        return wishlist.some(item => item.id === itemId);
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        showLoginModal,
        openLoginModal,
        closeLoginModal,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
