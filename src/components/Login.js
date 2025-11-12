import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineClose } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const { closeLoginModal, signIn, signUp, signInWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignUp) {
                // Sign up
                if (!displayName.trim()) {
                    setError('Please enter your name');
                    setLoading(false);
                    return;
                }
                const result = await signUp(email, password, displayName);
                if (!result.success) {
                    setError(result.error);
                }
            } else {
                // Sign in
                const result = await signIn(email, password);
                if (!result.success) {
                    setError(result.error);
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                    <h2>{isSignUp ? 'Create Account' : 'Welcome Back!'}</h2>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                            />
                        </div>
                    )}

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
                                placeholder={isSignUp ? 'Create a password (min 6 characters)' : 'Enter your password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
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

                    {error && <div className="error-message">{error}</div>}

                    {!isSignUp && (
                        <div className="forgot-password">
                            <button type="button" className="link-btn">Forgot Password?</button>
                        </div>
                    )}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Login')}
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <div className="social-login">
                    <button className="social-btn google" onClick={handleGoogleLogin} disabled={loading}>
                        <FaGoogle /> Continue with Google
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
