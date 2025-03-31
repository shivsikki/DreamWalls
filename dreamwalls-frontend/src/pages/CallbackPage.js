import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CallbackPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CallbackPage = () => {
    const navigate = useNavigate();
    const [callbackData, setCallbackData] = useState({
        name: '',
        phone: '',
        preferredTime: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/api/v1/contact/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'system@dreamwalls.com',
                    to: 'shibbs075@gmail.com',
                    subject: 'Callback Request',
                    name: callbackData.name,
                    phone: callbackData.phone,
                    message: `
                        Customer Details:
                        Name: ${callbackData.name}
                        Phone: ${callbackData.phone}
                        Preferred Time: ${callbackData.preferredTime}
                    `
                }),
            });

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: 'Request sent successfully! We will call you back soon.'
                });
                setTimeout(() => navigate('/properties'), 2000);
            } else {
                throw new Error('Failed to send request');
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Failed to send request. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="callback-page-full">
            <Navbar />
            <div className="callback-page">
                <div className="callback-container">
                    <h2>Request Callback</h2>
                    {status.message && (
                        <div className={`status-message ${status.type}`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                id="name"
                                type="text"
                                value={callbackData.name}
                                onChange={(e) => setCallbackData({...callbackData, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                value={callbackData.phone}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,10}$/.test(value)) {
                                        setCallbackData({...callbackData, phone: value});
                                    }
                                }}
                                maxLength="10"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Preferred Time for Callback</label>
                            <select
                                id="time"
                                value={callbackData.preferredTime}
                                onChange={(e) => setCallbackData({...callbackData, preferredTime: e.target.value})}
                                required
                            >
                                <option value="">Select Time</option>
                                <option value="morning">Morning (9 AM - 12 PM)</option>
                                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                <option value="evening">Evening (4 PM - 7 PM)</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="cancel-btn"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Request Callback'}
                            </button>
                        </div>
                    </form>
                </div>
            
        </div>
        <Footer />
    </div>
    );
};

export default CallbackPage;    