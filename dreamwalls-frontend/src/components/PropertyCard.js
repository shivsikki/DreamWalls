import React, { useState, useEffect } from 'react';
import '../styles/PropertyCard.css';
import { FaBed, FaBath, FaHeart, FaShare, FaEllipsisH, FaFaucet, FaTable, FaChair, FaTag, FaUtensilSpoon } from 'react-icons/fa';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import img from '../assets/images/interior2.jpg';


const formatPrice = (price) => {
    if (price === undefined || price === null) return 'N/A';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PropertyCard = ({ property, propertyDetails, isRentMode, onSaveProperty }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const furnished = searchParams.get('furnished');
    const isImageAvailable = propertyDetails && propertyDetails.mainImage && propertyDetails.mainImage.url;

    useEffect(() => {
        const checkSavedStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch('http://localhost:5000/api/v1/users/saved-properties', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch saved status');
                }

                const data = await response.json();
                setIsSaved(data.savedProperties.some(savedProp => savedProp._id === property._id));
            } catch (error) {
                console.error('Error checking saved status:', error);
            }
        };

        checkSavedStatus();
    }, [property._id]);

    const handleCardClick = (e) => {
        if (
            e.target.closest('.callback-modal') ||
            e.target.closest('.actions') || 
            e.target.closest('.card-actions')
        ) {
            return;
        }
            navigate(`/view-property/${property.id}`);
    };

    const handleSave = async (e) => {
        e.stopPropagation();
        
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/v1/users/save-property', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    propertyId: property._id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save property');
            }

            const data = await response.json();
            setIsSaved(data.isSaved);
            
            if (onSaveProperty) {
                onSaveProperty(property._id);
            }
        } catch (error) {
            console.error('Error saving property:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <div 
                style={{ cursor: 'pointer' }}
            >
                <div 
                    className={`property-card`}
                    onClick={handleCardClick}
                >
                    <div className="card-header">
                        <div className="tags">
                            <span className="tag">
                                {isRentMode ? 'FOR RENT' : 'FOR SALE'}
                            </span>
                            <span className="tag">POPULAR PROJECT</span>
                        </div>
                        <div className="actions">
                            <button 
                                className={`action-btn ${isSaved ? 'saved' : ''}`}
                                onClick={handleSave}
                                disabled={isLoading}
                            >
                                <FaHeart color={isSaved ? '#ff4444' : '#666'} />
                            </button>
                            <button className="action-btn"><FaEllipsisH /></button>
                        </div>
                    </div>

                    <div className="property-image">
                        {isImageAvailable ? (
                            <img 
                                src={propertyDetails.mainImage.url} 
                                alt={property.name} 
                                className="property-card-image"
                            />
                        ) : (
                            <img 
                                src={img} 
                                alt="Placeholder" 
                                className="property-card-image"
                            />
                        )}
                    </div>

                    <div className="property-details">
                        <div className="price-section">
                            <h2>
                                ₹{isRentMode 
                                    ? `${formatPrice(propertyDetails?.rent_price)}/month` 
                                    : formatPrice(propertyDetails?.buy_price)
                                }
                            </h2>
                            <span className="price-per-sqft">₹{formatPrice(Math.floor(property.price * 100000 / property.area))} per sqft</span>
                        </div>

                        <h3 className="property-title">{property?.name || 'Property Name Not Available'}</h3>
                        <p className="location">{property?.location || 'Location Not Available'}</p>

                        <div className="property-stats">
                            <div className="stat">
                                <span className="stat-label">BEDROOMS</span>
                                <span className="stat-value"><FaBed /> {property?.bedrooms || 'N/A'}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">KITCHEN</span>
                                <span className="stat-value"><FaUtensilSpoon /> {property?.kitchen || 'N/A'}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">BATHROOMS</span>
                                <span className="stat-value"><FaBath /> {property?.bathrooms || 'N/A'}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">FURNISHED</span>
                                <span className="stat-value"><FaChair /> {property?.furnished || 'N/A'}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">STATUS</span>
                                <span className="stat-value"><FaTable /> {property?.status || 'N/A'}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">INTERIOR</span>
                                <span className="stat-value"><FaFaucet/>{property?.interior || 'N/A'}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">TYPE</span>
                                <span className="stat-value"><FaTag />{property?.sale ? 'For Sale' : 'For Rent'}</span>
                            </div>
                        </div>

                        <div className="amenities">
                            {property?.lifts && <div className="amenity">
                                <span className="amenity-icon">🚁</span>
                                <span>Helipad</span>
                            </div>}
                            {property?.interior && <div className="amenity">
                                <span className="amenity-icon">🏛️</span>
                                <span>High Ceiling</span>
                            </div>}
                            {property?.gym && <div className="amenity">
                                <span className="amenity-icon">🏊‍♂️</span>
                                <span>Health club</span>
                            </div>}
                            <div className="amenity">
                                <span className="amenity-icon">🏰</span>
                                <span>Grand Entrance</span>
                            </div>
                        </div>

                        <div className="card-actions">
                            <Link 
                                to={`/callback/${property.id}`}
                                className="callback-btn"
                                onClick={e => e.stopPropagation()}
                            >
                                Request Callback
                            </Link>
                            <Link 
                                to={`/view-property/${property.id}`}
                                className="info-btn"
                                onClick={e => e.stopPropagation()}
                            >
                                Get Info
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;