import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import './Recommended.css';

const Recommended = () => {
    const navigate = useNavigate();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useAuth();

    // Sample product data
    const products = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400',
            title: 'Elegant Handbag',
            price: '₹2,499',
            discount: '20%',
            rating: 4.5,
            inStock: true
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
            title: 'Casual Shoes',
            price: '₹1,999',
            discount: '15%',
            rating: 4.3,
            inStock: true
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
            title: 'Cotton T-Shirt',
            price: '₹599',
            discount: '30%',
            rating: 4.7,
            inStock: true
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
            title: 'Summer Dress',
            price: '₹1,799',
            discount: '25%',
            rating: 4.6,
            inStock: true
        }
    ];

    const handleWishlistToggle = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="recommended-section">
            <div className="recommended-header">
                <div className="header-left">
                    <div className="red-circle"></div>
                    <h2>Recommended</h2>
                </div>
                <button className="see-more">See more</button>
            </div>

            <div className="products-grid">
                {products.map((product) => (
                    <div 
                        key={product.id} 
                        className="product-card"
                        onClick={() => navigate(`/product/${product.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="product-image-container">
                            <img src={product.image} alt={product.title} className="product-image" />
                            <div className="discount-badge">{product.discount}</div>
                            <button 
                                className="wishlist-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleWishlistToggle(product);
                                }}
                            >
                                {isInWishlist(product.id) ? (
                                    <AiFillHeart size={20} color="#e63946" />
                                ) : (
                                    <AiOutlineHeart size={20} color="#666" />
                                )}
                            </button>
                        </div>
                        <div className="product-info">
                            <h3 className="product-title">{product.title}</h3>
                            <div className="product-price">{product.price}</div>
                            <div className="product-rating">
                                ⭐ {product.rating}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommended;
