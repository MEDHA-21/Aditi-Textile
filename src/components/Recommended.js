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
            image: 'https://utkalamrita.com/cdn/shop/files/DSC_0168_06885829-536a-415e-99a6-d232d662ca9c.jpg?v=1750765822&w=400',
            title: 'S Design Red Black Sambalpuri Dress Set',
            price: '₹5,070.00',
            discount: '20%',
            rating: 4.5,
            inStock: true
        },
        {
            id: 2,
            image: 'https://utkalamrita.com/cdn/shop/files/DSC_0669_1cd394de-ad17-4bb6-8007-60cf281f090e.jpg?v=1762864794&w=400',
            title: 'Red Nabakothi Black Border Khandua Silk Saree',
            price: '₹12,999',
            discount: '15%',
            rating: 4.3,
            inStock: true
        },
        {
            id: 3,
            image: 'https://goswadeshi.in/cdn/shop/products/gcsbfbcodm967-_281_29.jpg?v=1681122122?w=400',
            title: 'Navy blue beige handwoven sambalpuri cotton dress material',
            price: '₹4,799',
            discount: '30%',
            rating: 4.7,
            inStock: true
        },
        {
            id: 4,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsL15Gh5DGR8sSfKhubws_jQV6WVa2LQL0CA&s?w=400',
            title: 'Sambalpuri Dress Material With Dupatta',
            price: '₹3,799',
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
                        onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
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
