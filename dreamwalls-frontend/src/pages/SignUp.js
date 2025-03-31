import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'BUYER'
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
            console.log('Form data being sent:', formData);
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log('Registration successful');
                navigate('/login');
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <div className="container-left">
                <div className="content-wrapper">
                    <h1>Welcome to DreamWalls</h1>
                    <p className="tagline">Your Gateway to your Dream Properties</p>
                    
                    <div className="benefits">
                        <div className="benefit-item">
                            <span className="icon">🏠</span>
                            <h3>Exclusive Property Listings</h3>
                            <p>Access premium properties before they hit the market</p>
                        </div>
                        
                        <div className="benefit-item">
                            <span className="icon">🤝</span>
                            <h3>Trusted Agents</h3>
                            <p>Connect with verified real estate professionals</p>
                        </div>
                        
                        <div className="benefit-item">
                            <span className="icon">💎</span>
                            <h3>Best Deals</h3>
                            <p>Get notified about the best property deals</p>
                        </div>
                    </div>

                    <button className="home-button" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>
            </div>

            <div className="container-right">
                <div className="card">
                    <h2 className="signup-title">Sign Up</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="inputBox1">
                            <input className='inputBox1'
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder=" "
                            />
                            <span>Name</span>
                        </div>

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
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                placeholder=" "
                            />
                            <span>Number</span>
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

                        <div className="inputBox">
                            <select className='inputBox1'
                                name="role"
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="BUYER">BUYER</option>
                                <option value="SELLER">SELLER</option>
                            </select>
                        </div>

                        <button type="submit" className="enter" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;