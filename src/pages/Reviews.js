import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BiImage } from 'react-icons/bi';
import './Reviews.css';

const Reviews = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const pendingReviews = [
        {
            id: 1,
            orderId: 'ORD001',
            product: 'Sambalpuri Cotton Saree - Red',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
            purchaseDate: '2025-11-05'
        },
        {
            id: 2,
            orderId: 'ORD002',
            product: 'Traditional Kurta Set',
            image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400',
            purchaseDate: '2025-11-08'
        }
    ];

    const submittedReviews = [
        {
            id: 1,
            product: 'Handloom Cotton Dupatta',
            image: 'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=400',
            rating: 5,
            review: 'Excellent quality! The fabric is soft and the colors are vibrant. Highly recommend!',
            date: '2025-10-20',
            helpful: 12
        },
        {
            id: 2,
            product: 'Sambalpuri Silk Saree',
            image: 'https://images.unsplash.com/photo-1583391733981-e8ad2f7ab344?w=400',
            rating: 4,
            review: 'Beautiful design and good quality. Took a bit longer to deliver but worth the wait.',
            date: '2025-10-15',
            helpful: 8
        },
        {
            id: 3,
            product: 'Kids Traditional Dress',
            image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400',
            rating: 5,
            review: 'Perfect for my daughter! The stitching is excellent and fits perfectly.',
            date: '2025-10-10',
            helpful: 15
        }
    ];

    const handleWriteReview = (product) => {
        setSelectedProduct(product);
        setRating(0);
        setReviewText('');
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        console.log('Submitting review:', { product: selectedProduct, rating, reviewText });
        alert('Review submitted successfully!');
        setSelectedProduct(null);
        setRating(0);
        setReviewText('');
    };

    const renderStars = (currentRating, interactive = false) => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <span 
                    key={index}
                    onClick={() => interactive && setRating(starValue)}
                    style={{ cursor: interactive ? 'pointer' : 'default' }}
                >
                    {starValue <= currentRating ? (
                        <AiFillStar size={interactive ? 30 : 20} color="#FFD700" />
                    ) : (
                        <AiOutlineStar size={interactive ? 30 : 20} color="#FFD700" />
                    )}
                </span>
            );
        });
    };

    return (
        <div className="reviews-page">
            <div className="page-header">
                <h1>My Reviews</h1>
                <p>Share your experience with our products</p>
            </div>

            {/* Pending Reviews Section */}
            {pendingReviews.length > 0 && (
                <div className="reviews-section">
                    <h2 className="section-title">Pending Reviews</h2>
                    <div className="pending-reviews-grid">
                        {pendingReviews.map((item) => (
                            <div key={item.id} className="pending-review-card">
                                <img src={item.image} alt={item.product} />
                                <div className="pending-review-info">
                                    <h3>{item.product}</h3>
                                    <p className="purchase-date">
                                        Purchased on {new Date(item.purchaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                    <button 
                                        className="write-review-btn"
                                        onClick={() => handleWriteReview(item)}
                                    >
                                        Write Review
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Submitted Reviews Section */}
            <div className="reviews-section">
                <h2 className="section-title">Your Reviews</h2>
                {submittedReviews.length > 0 ? (
                    <div className="submitted-reviews-list">
                        {submittedReviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-product">
                                    <img src={review.image} alt={review.product} />
                                    <div className="product-info">
                                        <h3>{review.product}</h3>
                                        <div className="review-rating">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                </div>
                                <p className="review-text">{review.review}</p>
                                <div className="review-footer">
                                    <span className="review-date">
                                        {new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="helpful-count">{review.helpful} people found this helpful</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-reviews">
                        <AiOutlineStar size={60} />
                        <h3>No reviews yet</h3>
                        <p>You haven't written any reviews</p>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {selectedProduct && (
                <div className="review-modal" onClick={() => setSelectedProduct(null)}>
                    <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setSelectedProduct(null)}>×</button>
                        <h2>Write a Review</h2>
                        
                        <div className="modal-product-info">
                            <img src={selectedProduct.image} alt={selectedProduct.product} />
                            <h3>{selectedProduct.product}</h3>
                        </div>

                        <form onSubmit={handleSubmitReview}>
                            <div className="rating-input">
                                <label>Your Rating *</label>
                                <div className="stars-input">
                                    {renderStars(rating, true)}
                                </div>
                            </div>

                            <div className="review-input">
                                <label>Your Review *</label>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Share your experience with this product..."
                                    rows="6"
                                    required
                                />
                            </div>

                            <div className="photo-upload">
                                <label>Add Photos (Optional)</label>
                                <button type="button" className="upload-btn">
                                    <BiImage size={24} />
                                    <span>Upload Photos</span>
                                </button>
                            </div>

                            <button type="submit" className="submit-review-btn" disabled={rating === 0}>
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;
