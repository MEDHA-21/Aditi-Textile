import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { cart } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1>ADITI TEXTILE</h1>
                    </Link>
                </div>

                <div className="search-box">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="search-input"
                    />
                </div>

                <div className="cart-icon" onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
                    <FiShoppingCart size={24} />
                    <span className="cart-badge">{cart.length}</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
