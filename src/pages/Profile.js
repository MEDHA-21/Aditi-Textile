import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiChevronRight, FiLogOut } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import { MdPayment, MdRateReview } from 'react-icons/md';
import { BiInfoCircle, BiPhoneCall } from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        {
            section: 'account',
            items: [
                { icon: <AiOutlineShoppingCart size={22} />, label: 'Orders', path: '/orders' },
                { icon: <AiOutlineHeart size={22} />, label: 'Wishlist', path: '/wishlist' },
                { icon: <IoLocationOutline size={22} />, label: 'Addresses', path: '/addresses' },
                { icon: <MdPayment size={22} />, label: 'Payment Methods', path: '/payment' },
                { icon: <MdRateReview size={22} />, label: 'Reviews', path: '/reviews' }
            ]
        },
        {
            section: 'support',
            items: [
                { icon: <BiInfoCircle size={22} />, label: 'About Us', path: '/about' },
                { icon: <BiPhoneCall size={22} />, label: 'Contact Us', path: '/contact' }
            ]
        }
    ];

    const handleLogout = () => {
        logout();
    };

    const handleMenuClick = (path) => {
        navigate(path);
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-avatar">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                    ) : (
                        <div className="avatar-placeholder">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="profile-info">
                    <h2>{user?.name || 'User'}</h2>
                    <p>{user?.email}</p>
                </div>
                <button className="edit-profile-btn">
                    <FiEdit2 size={18} />
                    Edit Profile
                </button>
            </div>

            <div className="profile-menu">
                {menuItems.map((section, idx) => (
                    <div key={idx} className="menu-section">
                        {section.items.map((item, itemIdx) => (
                            <div 
                                key={itemIdx} 
                                className="menu-item"
                                onClick={() => handleMenuClick(item.path)}
                            >
                                <div className="menu-item-left">
                                    <span className="menu-icon">{item.icon}</span>
                                    <span className="menu-label">{item.label}</span>
                                </div>
                                <FiChevronRight size={20} className="chevron-icon" />
                            </div>
                        ))}
                        {idx < menuItems.length - 1 && <div className="menu-divider"></div>}
                    </div>
                ))}
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                <FiLogOut size={20} />
                Logout
            </button>
        </div>
    );
};

export default Profile;
