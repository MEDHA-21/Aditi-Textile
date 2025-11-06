import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiFillHome, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiVideo, BiSolidVideo } from 'react-icons/bi';
import { IoChatbubbleOutline, IoChatbubble } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './BottomNav.css';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, openLoginModal } = useAuth();

    const navItems = [
        {
            id: 'home',
            label: 'Home',
            path: '/',
            icon: <AiOutlineHome size={24} />,
            activeIcon: <AiFillHome size={24} />,
            protected: false
        },
        {
            id: 'wishlist',
            label: 'Wishlist',
            path: '/wishlist',
            icon: <AiOutlineHeart size={24} />,
            activeIcon: <AiFillHeart size={24} />,
            protected: false
        },
        {
            id: 'videos',
            label: 'Videos',
            path: '/videos',
            icon: <BiVideo size={24} />,
            activeIcon: <BiSolidVideo size={24} />,
            protected: false
        },
        {
            id: 'chat',
            label: 'Chat',
            path: '/chat',
            icon: <IoChatbubbleOutline size={24} />,
            activeIcon: <IoChatbubble size={24} />,
            protected: false
        },
        {
            id: 'profile',
            label: 'Profile',
            path: '/profile',
            icon: <FiUser size={24} />,
            activeIcon: <FaUser size={24} />,
            protected: true
        }
    ];

    const handleNavClick = (item) => {
        if (item.protected && !isAuthenticated) {
            openLoginModal();
        } else {
            navigate(item.path);
        }
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="bottom-nav">
            {navItems.map((item) => (
                <div
                    key={item.id}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => handleNavClick(item)}
                >
                    <div className="nav-icon">
                        {isActive(item.path) ? item.activeIcon : item.icon}
                    </div>
                    <span className="nav-label">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default BottomNav;
