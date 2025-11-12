import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdRemove, MdArrowBack } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, isAuthenticated, updateCartQuantity, removeFromCart } = useAuth();

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        updateCartQuantity(itemId, newQuantity);
    };

    const removeItem = (itemId) => {
        removeFromCart(itemId);
    };

    const getItemTotal = (item) => {
        const price = typeof item.price === 'string' 
            ? parseInt(item.price.replace(/[₹,]/g, '')) 
            : item.price;
        return price * (item.quantity || 1);
    };

    const getSubtotal = () => {
        return cart.reduce((total, item) => total + getItemTotal(item), 0);
    };

    const getShipping = () => {
        return getSubtotal() > 5000 ? 0 : 100;
    };

    const getTotal = () => {
        return getSubtotal() + getShipping();
    };

    return (
        <div className="cart-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <MdArrowBack size={20} />
                Back
            </button>

            <div className="page-header">
                <h1>Shopping Cart</h1>
                <p>{cart.length} items</p>
                {!isAuthenticated && cart.length > 0 && (
                    <p className="guest-notice">Login to save your cart permanently</p>
                )}
            </div>

            {cart.length > 0 ? (
                <div className="cart-container">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div 
                                    className="item-image"
                                    onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={item.image} alt={item.title || item.name} />
                                </div>
                                
                                <div className="item-details">
                                    <h3 
                                        onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {item.title || item.name}
                                    </h3>
                                    <p className="item-price">
                                        {typeof item.price === 'string' ? item.price : `₹${item.price}`}
                                    </p>
                                    {item.size && <p className="item-size">Size: {item.size}</p>}
                                    <p className={`item-stock ${item.inStock ? 'in-stock' : 'out-stock'}`}>
                                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                    <button 
                                        className="remove-link"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                                <div className="item-quantity">
                                    <button 
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                    >
                                        <MdRemove size={18} />
                                    </button>
                                    <span className="qty-value">{item.quantity || 1}</span>
                                    <button 
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                    >
                                        <MdAdd size={18} />
                                    </button>
                                </div>

                                <div className="item-total">
                                    <p>₹{getItemTotal(item).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{getSubtotal().toLocaleString()}</span>
                        </div>
                        
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{getShipping() === 0 ? 'FREE' : `₹${getShipping()}`}</span>
                        </div>

                        {getShipping() > 0 && (
                            <p className="shipping-notice">
                                Add ₹{(5000 - getSubtotal()).toLocaleString()} more for FREE shipping!
                            </p>
                        )}

                        <div className="summary-divider"></div>

                        <div className="summary-row total">
                            <span>Total</span>
                            <span>₹{getTotal().toLocaleString()}</span>
                        </div>

                        <button className="checkout-btn">
                            Proceed to Checkout
                        </button>

                        <button 
                            className="continue-shopping-btn"
                            onClick={() => navigate('/products/women')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <MdArrowBack size={80} style={{ transform: 'rotate(180deg)' }} />
                    <h2>Your cart is empty</h2>
                    <p>Add items to your cart to see them here</p>
                    <button onClick={() => navigate('/products/women')}>
                        Start Shopping
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
