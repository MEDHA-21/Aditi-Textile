import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    MdFavoriteBorder, 
    MdFavorite, 
    MdShoppingCart, 
    MdArrowBack,
    MdChevronLeft,
    MdChevronRight,
    MdStar,
    MdStarBorder,
    MdLocalShipping,
    MdVerifiedUser,
    MdAutorenew
} from 'react-icons/md';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useAuth();
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    // Mock product data - will be replaced with API call
    const product = {
        id: parseInt(id),
        name: 'Sambalpuri Cotton Saree',
        category: 'women',
        price: 2499,
        originalPrice: 3999,
        discount: 38,
        rating: 4.5,
        reviews: 127,
        inStock: true,
        stock: 15,
        images: [
            'https://via.placeholder.com/600x800/e63946/ffffff?text=Image+1',
            'https://via.placeholder.com/600x800/d32735/ffffff?text=Image+2',
            'https://via.placeholder.com/600x800/c41e3a/ffffff?text=Image+3',
            'https://via.placeholder.com/600x800/b01030/ffffff?text=Image+4',
        ],
        description: 'Beautiful handwoven Sambalpuri cotton saree featuring traditional Ikat patterns. Perfect for both casual and formal occasions. Made with 100% pure cotton for ultimate comfort.',
        sizes: ['Free Size'],
        material: '100% Pure Cotton',
        care: 'Hand wash in cold water, Do not bleach, Dry in shade',
        features: [
            'Authentic Sambalpuri weaving',
            'Traditional Ikat design',
            'Comfortable cotton fabric',
            'Fade-resistant colors',
            'Comes with unstitched blouse piece'
        ],
        specifications: {
            'Fabric': 'Cotton',
            'Pattern': 'Ikat',
            'Length': '6.3 meters (with blouse)',
            'Blouse': 'Unstitched 0.8m',
            'Color': 'Red with traditional motifs',
            'Occasion': 'Casual, Festive, Formal'
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePrevImage = () => {
        setCurrentImageIndex(prev => 
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prev => 
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const handleAddToCart = () => {
        if (!selectedSize && product.sizes.length > 1) {
            alert('Please select a size');
            return;
        }

        const cartItem = {
            ...product,
            selectedSize: selectedSize || product.sizes[0],
            quantity: quantity
        };

        addToCart(cartItem);
        alert('Added to cart!');
    };

    const handleWishlistToggle = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            const wishlistItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                category: product.category
            };
            addToWishlist(wishlistItem);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? 
                <MdStar key={i} className="star filled" /> : 
                <MdStarBorder key={i} className="star" />
            );
        }
        return stars;
    };

    return (
        <div className="product-details-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <MdArrowBack size={20} />
                Back
            </button>

            <div className="product-details-container">
                {/* Image Carousel Section */}
                <div className="product-images">
                    <div className="main-image-container">
                        <img 
                            src={product.images[currentImageIndex]} 
                            alt={product.name}
                            className="main-image"
                        />
                        
                        {product.images.length > 1 && (
                            <>
                                <button 
                                    className="carousel-btn prev-btn"
                                    onClick={handlePrevImage}
                                >
                                    <MdChevronLeft size={30} />
                                </button>
                                <button 
                                    className="carousel-btn next-btn"
                                    onClick={handleNextImage}
                                >
                                    <MdChevronRight size={30} />
                                </button>
                                
                                <div className="carousel-dots">
                                    {product.images.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Thumbnail Images */}
                    {product.images.length > 1 && (
                        <div className="thumbnail-container">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info Section */}
                <div className="product-info">
                    <h1 className="product-name">{product.name}</h1>
                    
                    <div className="rating-section">
                        <div className="stars">
                            {renderStars(product.rating)}
                        </div>
                        <span className="rating-text">
                            {product.rating} ({product.reviews} reviews)
                        </span>
                    </div>

                    <div className="price-section">
                        <span className="current-price">₹{product.price}</span>
                        {product.originalPrice && (
                            <>
                                <span className="original-price">₹{product.originalPrice}</span>
                                <span className="discount-badge">{product.discount}% OFF</span>
                            </>
                        )}
                    </div>

                    <div className="stock-status">
                        {product.inStock ? (
                            <span className="in-stock">✓ In Stock ({product.stock} available)</span>
                        ) : (
                            <span className="out-of-stock">✗ Out of Stock</span>
                        )}
                    </div>

                    {/* Size Selection */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="size-section">
                            <h3>Size</h3>
                            <div className="size-options">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Selection */}
                    <div className="quantity-section">
                        <h3>Quantity</h3>
                        <div className="quantity-controls">
                            <button 
                                className="qty-btn"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <span className="qty-value">{quantity}</span>
                            <button 
                                className="qty-btn"
                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button 
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            <MdShoppingCart size={20} />
                            Add to Cart
                        </button>
                        <button 
                            className="wishlist-btn"
                            onClick={handleWishlistToggle}
                        >
                            {isInWishlist(product.id) ? (
                                <MdFavorite size={24} className="filled" />
                            ) : (
                                <MdFavoriteBorder size={24} />
                            )}
                        </button>
                    </div>

                    {/* Features */}
                    <div className="features-section">
                        <div className="feature-item">
                            <MdLocalShipping size={24} />
                            <div>
                                <h4>Free Shipping</h4>
                                <p>On orders above ₹999</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <MdAutorenew size={24} />
                            <div>
                                <h4>Easy Returns</h4>
                                <p>7 days return policy</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <MdVerifiedUser size={24} />
                            <div>
                                <h4>Authentic Product</h4>
                                <p>100% genuine products</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description Tabs */}
            <div className="product-tabs">
                <div className="tab-content">
                    <div className="tab-section">
                        <h2>Description</h2>
                        <p>{product.description}</p>
                    </div>

                    <div className="tab-section">
                        <h2>Features</h2>
                        <ul className="features-list">
                            {product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="tab-section">
                        <h2>Specifications</h2>
                        <table className="specs-table">
                            <tbody>
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="spec-label">{key}</td>
                                        <td className="spec-value">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="tab-section">
                        <h2>Care Instructions</h2>
                        <p>{product.care}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
