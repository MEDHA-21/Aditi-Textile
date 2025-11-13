import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import './Chat.css';

const Chat = () => {
    const whatsappNumber = '919437737336';
    const phoneNumber = '9437737336';
    
    // Check if store is currently open (10 AM - 8 PM)
    const isStoreOpen = () => {
        const now = new Date();
        const currentHour = now.getHours();
        return currentHour >= 10 && currentHour < 20; // 10 AM to 8 PM
    };

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent('Hi! I am interested in your Sambalpuri products.');
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    const handleCallClick = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    const handleEmailClick = () => {
        window.location.href = 'mailto:adititextile@gmail.com?subject=Product Inquiry';
    };

    return (
        <div className="chat-page">
            <div className="chat-header">
                <MdMessage size={40} color="#e63946" />
                <h1>Contact Us</h1>
                <p>Choose your preferred way to reach us</p>
            </div>

            <div className="contact-options">
                <div className="contact-card whatsapp-card" onClick={handleWhatsAppClick}>
                    <div className="contact-icon whatsapp-icon">
                        <FaWhatsapp size={32} />
                    </div>
                    <div className="contact-info">
                        <h3>WhatsApp Chat</h3>
                        <p>Chat with us instantly</p>
                        <span className={`status-badge ${isStoreOpen() ? 'online' : 'offline'}`}>
                            {isStoreOpen() ? 'Available Now' : 'Offline'}
                        </span>
                    </div>
                    <div className="arrow"></div>
                </div>

                <div className="contact-card call-card" onClick={handleCallClick}>
                    <div className="contact-icon call-icon">
                        <FaPhone size={28} />
                    </div>
                    <div className="contact-info">
                        <h3>Call Us</h3>
                        <p>{phoneNumber}</p>
                        <span className="timing">Mon-Sat: 10 AM - 8 PM</span>
                    </div>
                    <div className="arrow"></div>
                </div>

                <div className="contact-card email-card" onClick={handleEmailClick}>
                    <div className="contact-icon email-icon">
                        <FaEnvelope size={28} />
                    </div>
                    <div className="contact-info">
                        <h3>Email Us</h3>
                        <p>adititextile@gmail.com</p>
                        <span className="timing">Reply within 24 hours</span>
                    </div>
                    <div className="arrow"></div>
                </div>
            </div>

            <div className="quick-messages">
                <h3>Quick Messages</h3>
                <p>Tap to send via WhatsApp</p>
                <div className="quick-buttons">
                    <button onClick={() => {
                        const msg = encodeURIComponent('I want to know about product availability');
                        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
                    }}>
                        Check Product Availability
                    </button>
                    <button onClick={() => {
                        const msg = encodeURIComponent('What are your delivery charges?');
                        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
                    }}>
                        Delivery Charges Information
                    </button>
                    <button onClick={() => {
                        const msg = encodeURIComponent('I want to know about bulk orders');
                        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
                    }}>
                        Bulk Order Inquiry
                    </button>
                    <button onClick={() => {
                        const msg = encodeURIComponent('Can you help me with custom designs?');
                        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
                    }}>
                        Custom Design Request
                    </button>
                    <button onClick={() => {
                        const msg = encodeURIComponent('I am interested in becoming a reseller. Can you share the details?');
                        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
                    }}>
                        Reseller Inquiry
                    </button>
                </div>
            </div>

            <div className="store-hours">
                <h4>Store Hours</h4>
                <div className="hours-grid">
                    <div><span>Monday - Saturday</span><span>10:00 AM - 8:00 PM</span></div>
                    <div><span>Sunday</span><span>Closed</span></div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
