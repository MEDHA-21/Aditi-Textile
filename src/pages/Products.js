import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiFilterAlt } from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';
import './Products.css';

const Products = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);

    // Sample products data
    const allProducts = [
        // Women's Products
        { id: 1, name: 'Sambalpuri Cotton Saree - Red', price: 2499, category: 'women', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', discount: 20 },
        { id: 2, name: 'Traditional Silk Saree', price: 4999, category: 'women', image: 'https://images.unsplash.com/photo-1583391733981-e8ad2f7ab344?w=400', discount: 15 },
        { id: 3, name: 'Handloom Cotton Dupatta', price: 899, category: 'women', image: 'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=400', discount: 10 },
        { id: 4, name: 'Designer Kurta Set', price: 1899, category: 'women', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400', discount: 25 },
        { id: 5, name: 'Sambalpuri Print Dress', price: 1599, category: 'women', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', discount: 30 },
        { id: 6, name: 'Traditional Lehenga', price: 5999, category: 'women', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400', discount: 20 },
        
        // Men's Products
        { id: 7, name: 'Traditional Kurta - White', price: 1299, category: 'men', image: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400', discount: 15 },
        { id: 8, name: 'Sambalpuri Dhoti Set', price: 899, category: 'men', image: 'https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=400', discount: 10 },
        { id: 9, name: 'Cotton Pathani Suit', price: 1899, category: 'men', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400', discount: 20 },
        { id: 10, name: 'Traditional Sherwani', price: 6999, category: 'men', image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400', discount: 25 },
        
        // Kids Products
        { id: 11, name: 'Kids Traditional Dress - Girl', price: 1299, category: 'kids', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', discount: 15 },
        { id: 12, name: 'Kids Kurta Set - Boy', price: 999, category: 'kids', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400', discount: 20 },
        { id: 13, name: 'Kids Lehenga Choli', price: 1799, category: 'kids', image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400', discount: 25 },
        { id: 14, name: 'Kids Ethnic Wear Set', price: 1399, category: 'kids', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400', discount: 10 },
        
        // Others
        { id: 15, name: 'Handwoven Table Runner', price: 599, category: 'others', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400', discount: 15 },
        { id: 16, name: 'Decorative Wall Hanging', price: 799, category: 'others', image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=400', discount: 20 },
        { id: 17, name: 'Sambalpuri Cushion Covers', price: 499, category: 'others', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', discount: 10 },
        { id: 18, name: 'Traditional Bedsheet Set', price: 2499, category: 'others', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', discount: 25 }
    ];

    const filteredProducts = category 
        ? allProducts.filter(p => p.category === category.toLowerCase())
        : allProducts;

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'discount':
                return b.discount - a.discount;
            default:
                return 0;
        }
    });

    const toggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            // Format product data to match wishlist structure
            const wishlistItem = {
                id: product.id,
                title: product.name,
                price: `₹${getDiscountedPrice(product.price, product.discount)}`,
                image: product.image,
                inStock: true
            };
            addToWishlist(wishlistItem);
        }
    };

    const getCategoryTitle = () => {
        if (!category) return 'All Products';
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    const getDiscountedPrice = (price, discount) => {
        return Math.round(price - (price * discount / 100));
    };

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>{getCategoryTitle()}</h1>
                <p>{sortedProducts.length} products</p>
            </div>

            <div className="products-controls">
                <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
                    <BiFilterAlt size={20} />
                    Filters
                </button>
                <select 
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Discount</option>
                </select>
            </div>

            <div className="products-grid">
                {sortedProducts.map((product) => {
                    const discountedPrice = getDiscountedPrice(product.price, product.discount);
                    const inWishlist = isInWishlist(product.id);

                    return (
                        <div key={product.id} className="product-card">
                            {product.discount > 0 && (
                                <span className="discount-badge">{product.discount}%</span>
                            )}
                            <button 
                                className="wishlist-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleWishlist(product);
                                }}
                            >
                                {inWishlist ? (
                                    <AiFillHeart size={24} color="#e63946" />
                                ) : (
                                    <AiOutlineHeart size={24} />
                                )}
                            </button>
                            
                            <div 
                                className="product-clickable"
                                onClick={() => navigate(`/product/${product.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="product-image"
                                />
                                
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <div className="product-price">
                                        <span className="current-price">₹{discountedPrice}</span>
                                        {product.discount > 0 && (
                                            <span className="original-price">₹{product.price}</span>
                                        )}
                                    </div>
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
                    );
                })}
            </div>

            {sortedProducts.length === 0 && (
                <div className="no-products">
                    <p>No products found in this category.</p>
                    <button onClick={() => navigate('/')}>Browse All Products</button>
                </div>
            )}
        </div>
    );
};

export default Products;
