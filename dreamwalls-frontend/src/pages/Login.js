import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { tokenManager } from '../utils/tokenManager';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Attempting login with:', { email: formData.email });
            const response = await fetch('http://localhost:5000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            console.log('Login response:', data);
            
            if (response.ok) {
                tokenManager.setToken(data.token);
                console.log('Login successful, token stored');
                navigate('/account'); // Redirect to account page after successful login
            } else {
                setError(data.error || 'Login failed');
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Network error:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <div className="container-left">
                <div className="content-wrapper">
                    <h1>Welcome Back</h1>
                    <p className="tagline">Continue Your Property Journey</p>
                    
                    <div className="benefits">
                        <div className="benefit-item">
                            <span className="icon">🔑</span>
                            <h3>Secure Access</h3>
                            <p>Access your saved properties and preferences</p>
                        </div>
                        
                        <div className="benefit-item">
                            <span className="icon">📱</span>
                            <h3>Stay Connected</h3>
                            <p>Get instant updates on your property interests</p>
                        </div>
                        
                        <div className="benefit-item">
                            <span className="icon">💫</span>
                            <h3>Personalized Experience</h3>
                            <p>Receive tailored property recommendations</p>
                        </div>
                    </div>

                    <button className="home-button" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>
            </div>

            <div className="container-right">
                <div className="card">
                    <h2 className="signup-title">Login</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="inputBox1">
                            <input className='inputBox1'
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder=" "
                            />
                            <span>Email</span>
                        </div>

                        <div className="inputBox1">
                            <input className='inputBox1'
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder=" "
                            />
                            <span>Password</span>
                        </div>

                        <button type="submit" className="enter" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="signup-link">
                        Don't have an account?{' '}
                        <span onClick={() => navigate('/register')}>Sign Up</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login; 