import React, { useState } from 'react';
import { BiMap, BiPhoneCall } from 'react-icons/bi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [contactForm, setContactForm] = useState({
        fullName: '',
        emailAddress: '',
        topic: '',
        messageText: ''
    });

    const contactMethods = [
        {
            icon: <BiPhoneCall size={28} />,
            title: 'Call Us',
            detail: '+91 94377 37336',
            link: 'tel:+919437737336',
            color: '#10B981'
        },
        {
            icon: <BiMap size={28} />,
            title: 'Visit Our Store',
            detail: 'Aditi Textile, Near Khetrajpur State Bank, Sambalpur, Odisha 768003',
            link: 'https://www.google.com/maps/dir//FXG3%2BFMQ,+Dhubopara,+Bada+Bazar,+Khetrajpur,+Sambalpur,+Odisha+768003/@21.476188,83.8718381,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a21166d26b57fcd:0x305c36d645986aff!2m2!1d83.9542393!2d21.4762068?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D',
            color: '#EF4444'
        },
        {
            icon: <FaWhatsapp size={28} />,
            title: 'WhatsApp',
            detail: 'Chat with us',
            link: 'https://wa.me/919437737336',
            color: '#25D366'
        },
        {
            icon: <FaInstagram size={28} />,
            title: 'Follow on Instagram',
            detail: '@aditi_textile',
            link: 'https://www.instagram.com/aditi_textile/',
            color: '#E4405F'
        }
    ];

    const socialPlatforms = [
        { 
            icon: <FaWhatsapp size={26} />, 
            link: 'https://wa.me/919437737336',
            color: '#25D366',
            label: 'WhatsApp'
        },
        { 
            icon: <FaInstagram size={26} />, 
            link: 'https://www.instagram.com/aditi_textile/',
            color: '#E4405F',
            label: 'Instagram'
        }
    ];

    return (
        <div className="contact-container">
            <div className="contact-header-section">
                <h1>Get In Touch</h1>
                <p>We'd love to hear from you. Send us a message!</p>
            </div>

            <div className="contact-content-wrapper">
                <div className="contact-methods-grid">
                    {contactMethods.map((method, index) => (
                        <div key={index} className="contact-method-card">
                            <div className="method-icon" style={{ color: method.color }}>
                                {method.icon}
                            </div>
                            <h3>{method.title}</h3>
                            {method.link ? (
                                <a 
                                    href={method.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    {method.detail}
                                </a>
                            ) : (
                                <p>{method.detail}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="social-connections">
                    <h3>Connect With Us</h3>
                    <div className="social-icons-row">
                        {socialPlatforms.map((platform, idx) => (
                            <a
                                key={idx}
                                href={platform.link}
                                className="social-link"
                                style={{ color: platform.color }}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={platform.label}
                            >
                                {platform.icon}
                            </a>
                        ))}
                    </div>
                    <p className="owner-credit">Owned by Rakhi Mani Bhagat</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
