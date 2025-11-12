import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import './Wishlist.css';

const Wishlist = () => {
    const navigate = useNavigate();
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
                            <button 
                                className="remove-btn" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(item.id);
                                }}
                            >
                                <AiFillHeart size={20} />
                            </button>
                            
                            <div 
                                className="wishlist-clickable"
                                onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="wishlist-image-container">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="wishlist-info">
                                    <h3>{item.title}</h3>
                                    <p className="price">{item.price}</p>
                                    <p className={`stock ${item.inStock ? 'in-stock' : 'out-stock'}`}>
                                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                </div>
                            </div>
                            
                            <button 
                                className="add-to-cart-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert('Added to cart!');
                                }}
                            >
                                Add to Cart
                            </button>
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
