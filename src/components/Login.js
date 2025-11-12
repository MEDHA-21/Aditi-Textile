import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const { closeLoginModal, signInWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            const result = await signInWithGoogle();
            if (!result.success) {
                setError(result.error);
            }
        } catch (err) {
            setError('Google sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-modal-overlay" onClick={closeLoginModal}>
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeLoginModal}>
                    <AiOutlineClose size={24} />
                </button>

                <div className="login-header">
                    <div className="app-logo">ADITI TEXTILE</div>
                    <h2>Welcome!</h2>
                    <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                        Sign in to save your wishlist and orders
                    </p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="social-login">
                    <button 
                        className="social-btn google" 
                        onClick={handleGoogleLogin} 
                        disabled={loading}
                        style={{ width: '100%', marginTop: '20px' }}
                    >
                        <FaGoogle /> {loading ? 'Signing in...' : 'Continue with Google'}
                    </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#999' }}>
                    More sign-in options coming soon!
                </div>
            </div>
        </div>
    );
};

export default Login;
