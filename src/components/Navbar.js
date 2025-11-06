import React from 'react';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h1>ADITI TEXTILE</h1>
                </div>

                <div className="search-box">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="search-input"
                    />
                </div>

                <div className="cart-icon">
                    <FiShoppingCart size={24} />
                    <span className="cart-badge">0</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
