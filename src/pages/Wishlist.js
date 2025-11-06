import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import './Wishlist.css';

const Wishlist = () => {
    const { wishlist, removeFromWishlist, isAuthenticated } = useAuth();

    const handleRemove = (itemId) => {
        removeFromWishlist(itemId);
    };

    return (
        <div className="wishlist-page">
            <div className="page-header">
                <h1>My Wishlist</h1>
                <p>{wishlist.length} items</p>
                {!isAuthenticated && wishlist.length > 0 && (
                    <p className="guest-notice">Login to save your wishlist permanently</p>
                )}
            </div>

            {wishlist.length > 0 ? (
                <div className="wishlist-grid">
                    {wishlist.map((item) => (
                        <div key={item.id} className="wishlist-card">
                            <div className="wishlist-image-container">
                                <img src={item.image} alt={item.title} />
                                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                                    <AiFillHeart size={20} />
                                </button>
                            </div>
                            <div className="wishlist-info">
                                <h3>{item.title}</h3>
                                <p className="price">{item.price}</p>
                                <p className={`stock ${item.inStock ? 'in-stock' : 'out-stock'}`}>
                                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                                </p>
                                <button className="add-to-cart-btn">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-wishlist">
                    <AiOutlineHeart size={80} />
                    <h2>Your wishlist is empty</h2>
                    <p>Save items you like to your wishlist</p>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
