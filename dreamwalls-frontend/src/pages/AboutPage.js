import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AboutPage.css';
import teamImage from '../assets/images/UserProfile.png';

const AboutPage = () => {
    return (
        <div className="about-wrapper">
            <Navbar />
            
            <div className="hero-section">
                <h1>Dream Walls Private Limited</h1>
                <p className="tagline">Creating Dreams, Building Futures Since 1995</p>
            </div>

            <div className="about-container">
                <div className="mission-section">
                    <h2>Our Mission</h2>
                    <p>We are dedicated to providing exceptional real estate services, helping families find their perfect homes, and delivering unparalleled value to our clients through expertise and integrity.</p>
                </div>

                <div className="stats-section">
                    <div className="stat-card">
                        <i className="fas fa-home"></i>
                        <h3>1500+</h3>
                        <p>Properties Sold</p>
                    </div>
                    <div className="stat-card">
                        <i className="fas fa-users"></i>
                        <h3>2000+</h3>
                        <p>Happy Clients</p>
                    </div>
                    <div className="stat-card">
                        <i className="fas fa-award"></i>
                        <h3>25+</h3>
                        <p>Years Experience</p>
                    </div>
                </div>

                <div className="team-section">
                    <h2>Meet Our Expert Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-img">
                                <img src={teamImage} alt="Team Member" />
                            </div>
                            <h3>Sharma Vedant </h3>
                            <p>CEO & Founder</p>
                        </div>
                        <div className="team-member">
                            <div className="member-img">
                                <img src={teamImage} alt="Team Member" />
                            </div>
                            <h3>Shivam Bhat</h3>
                            <p>CEO & Founder</p>
                        </div>
                    </div>
                </div>

                <div className="values-section">
                    <h2>Why Choose Us</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <i className="fas fa-handshake"></i>
                            <h3>Trust & Reliability</h3>
                            <p>Building lasting relationships through honest and transparent dealings.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-chart-line"></i>
                            <h3>Market Expertise</h3>
                            <p>In-depth knowledge of local real estate markets and trends.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-clock"></i>
                            <h3>24/7 Support Available</h3>
                            <p>Always available to address your real estate needs.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default AboutPage;