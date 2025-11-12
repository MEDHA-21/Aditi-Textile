import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdminPanelSettings, MdLock, MdPerson } from 'react-icons/md';
import './ShopkeeperLogin.css';

const ShopkeeperLogin = () => {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
        role: 'shopkeeper'
    });
    const [error, setError] = useState('');

    // Predefined credentials (will be replaced with backend authentication)
    const credentials = {
        shopkeeper: {
            username: 'rakhi_aditi',
            password: 'aditi@2025',
            role: 'shopkeeper',
            name: 'Rakhi Mani Bhagat'
        },
        worker: {
            username: 'worker_aditi',
            password: 'worker@2025',
            role: 'worker',
            name: 'Store Worker'
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        const userCred = credentials[loginForm.role];
        
        if (loginForm.username === userCred.username && loginForm.password === userCred.password) {
            // Store session
            const session = {
                username: userCred.username,
                name: userCred.name,
                role: userCred.role,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('shopkeeper_session', JSON.stringify(session));
            
            // Redirect to dashboard
            navigate('/shopkeeper');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="shopkeeper-login-page">
            <div className="login-container">
                <div className="login-header">
                    <MdAdminPanelSettings size={60} color="#e63946" />
                    <h1>Aditi Textile</h1>
                    <p>Admin Portal</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="role-selector">
                        <button
                            type="button"
                            className={loginForm.role === 'shopkeeper' ? 'active' : ''}
                            onClick={() => setLoginForm({ ...loginForm, role: 'shopkeeper', username: '', password: '' })}
                        >
                            <MdAdminPanelSettings size={24} />
                            Shopkeeper
                        </button>
                        <button
                            type="button"
                            className={loginForm.role === 'worker' ? 'active' : ''}
                            onClick={() => setLoginForm({ ...loginForm, role: 'worker', username: '', password: '' })}
                        >
                            <MdPerson size={24} />
                            Worker
                        </button>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label>
                            <MdPerson size={20} />
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={loginForm.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <MdLock size={20} />
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={loginForm.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>

                    <div className="demo-credentials">
                        <p><strong>Demo Credentials:</strong></p>
                        <div className="credentials-list">
                            <div>
                                <strong>Shopkeeper:</strong><br />
                                Username: rakhi_aditi<br />
                                Password: aditi@2025
                            </div>
                            <div>
                                <strong>Worker:</strong><br />
                                Username: worker_aditi<br />
                                Password: worker@2025
                            </div>
                        </div>
                    </div>
                </form>

                <button className="back-btn" onClick={() => navigate('/')}>
                    ← Back to Website
                </button>
            </div>
        </div>
    );
};

export default ShopkeeperLogin;
