import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineClose } from 'react-icons/ai';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const { closeLoginModal, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login - replace with actual authentication
        const userData = {
            name: email.split('@')[0],
            email: email,
            avatar: null
        };
        login(userData);
    };

    const handleSocialLogin = (provider) => {
        // Mock social login - replace with actual OAuth
        const userData = {
            name: `User from ${provider}`,
            email: `user@${provider}.com`,
            avatar: null
        };
        login(userData);
    };

    return (
        <div className="login-modal-overlay" onClick={closeLoginModal}>
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeLoginModal}>
                    <AiOutlineClose size={24} />
                </button>

                <div className="login-header">
                    <div className="app-logo">ADITI TEXTILE</div>
                    <h2>{isSignUp ? 'Create Account' : 'Welcome Back!'}</h2>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </button>
                        </div>
                    </div>

                    {!isSignUp && (
                        <div className="forgot-password">
                            <button type="button" className="link-btn">Forgot Password?</button>
                        </div>
                    )}

                    <button type="submit" className="login-btn">
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <div className="social-login">
                    <button className="social-btn google" onClick={() => handleSocialLogin('Google')}>
                        <FaGoogle /> Google
                    </button>
                    <button className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
                        <FaFacebook /> Facebook
                    </button>
                </div>

                <div className="signup-link">
                    {isSignUp ? (
                        <>
                            Already have an account?{' '}
                            <button className="link-btn" onClick={() => setIsSignUp(false)}>
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <button className="link-btn" onClick={() => setIsSignUp(true)}>
                                Sign up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
