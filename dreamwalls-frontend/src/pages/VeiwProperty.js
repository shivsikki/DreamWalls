import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaTag, FaUser, FaPhone, FaBuilding, FaHome, FaCalendar, FaCheck, FaTimes, FaBed, FaBath, FaUtensils, FaLevelUpAlt, FaChair } from "react-icons/fa";
import "../styles/ViewProperty.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import houseImg1 from "../assets/images/house-img-1.webp";

const PropertyDetails = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const propertyResponse = await fetch(`http://localhost:5000/api/v1/properties/${id}`);
                
                if (!propertyResponse.ok) {
                    throw new Error(`HTTP error! status: ${propertyResponse.status}`);
                }
                
                const propertyData = await propertyResponse.json();
                console.log('Basic property data:', propertyData);

                // Fetch property details
                const detailsResponse = await fetch(`http://localhost:5000/api/v1/property-details/${id}`);
                
                if (!detailsResponse.ok) {
                    throw new Error(`HTTP error! status: ${detailsResponse.status}`);
                }
                
                const detailsData = await detailsResponse.json();
                console.log('Property details data:', detailsData);

                const combinedData = { ...propertyData, ...detailsData };
                console.log('Combined data:', combinedData);
                if (combinedData.data.mainImage && combinedData.data.mainImage.url) {
                    setSelectedImage(combinedData.data.mainImage.url);
                } else {
                    console.warn('Main image is not available in the fetched data.');
                    setSelectedImage(houseImg1);
                }

                setProperty(combinedData);
                setError(null);
            } catch (error) {
                console.error('Error fetching property:', error);
                setError('Failed to load property data');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <div className="view-property-container">
                <Navbar />
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '50vh' 
                }}>
                    <h2>Loading property details...</h2>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="view-property-container">
                <Navbar />
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '50vh' 
                }}>
                    <h2>{error}</h2>
                </div>
                <Footer />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="view-property-container">
                <Navbar />
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '50vh' 
                }}>
                    <h2>Property not found</h2>
                </div>
                <Footer />
            </div>
        );
    }

    const leftColumnDetails = [
        { label: "Bedrooms", value: property.bedrooms, icon: <FaBed /> },
        { label: "Bathrooms", value: property.bathrooms, icon: <FaBath /> },
        { label: "Kitchen", value: property.kitchen, icon: <FaUtensils /> },
        { label: "Total Floors", value: property.total_floors, icon: <FaLevelUpAlt /> }
    ];

    const rightColumnDetails = [
        { label: "Furnished", value: property.furnished, icon: <FaChair /> },
        { label: "Total Rooms", value: property.rooms, icon: <FaHome /> },
        { label: "Interior", value: property.interior, icon: <FaBuilding /> },
        { label: "Status", value: property.status, icon: <FaHome /> }
    ];

    const amenities = [
        { name: "Lifts", available: property.lifts },
        { name: "Security Guards", available: property.security_guards },
        { name: "Play Ground", available: property.play_ground },
        { name: "Gardens", available: property.gardens },
        { name: "Water Supply", available: property.water_supply },
        { name: "Power Backup", available: property.power_backup },
        { name: "Parking Area", available: property.parking },
        { name: "Gym", available: property.gym },
        { name: "Shopping Mall", available: property.shopping_mall },
        { name: "Hospitals", available: property.hospitals },
        { name: "Schools", available: property.schools },
        { name: "Market Area", available: property.market_area }
    ];

    return (
        <div className="view-property-container">
            <Navbar />
            <section className="view-property">
                <div className="details">
                    {/* Property Images */}
                    <div className="thumb">
                        <div className="big-image">
                            <img src={selectedImage} alt="Property" />
                        </div>
                        <div className="small-images">
                            {property && property.data.sideImages && property.data.sideImages.length > 0 ? (
                                [property.data.mainImage, ...property.data.sideImages].map((image, index) => (
                                    <img 
                                        key={index}
                                        src={image.url} 
                                        alt={`Small Property ${index + 1}`} 
                                        className={selectedImage === image.url ? 'active' : ''}
                                        onClick={() => setSelectedImage(image.url)}
                                    />
                                ))
                            ) : (
                                <p>No additional images available.</p>
                            )}
                        </div>
                    </div>

                    {/* Property Header */}
                    <div className="property-header">
                        <h3 className="name">{property.name}</h3>
                        <p className="location">
                            <FaMapMarkerAlt /> <span>{property.location}</span>
                        </p>
                    </div>

                    {/* Property Quick Info */}
                    <div className="info">
                        <div className="info-item">
                            <FaTag className="info-icon" />
                            <div className="info-content">
                                <span className="info-label">Status</span>
                                <span className="info-value">{property.sale ? 'For Sale' : 'For Rent'}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaUser className="info-icon" />
                            <div className="info-content">
                                <span className="info-label">Owner</span>
                                <span className="info-value">{property.owner}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaPhone className="info-icon" />
                            <div className="info-content">
                                <span className="info-label">Contact</span>
                                <a href={`tel:${property.phone_no}`} className="info-value">
                                    {property.phone_no || 'Not Available'}
                                </a>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaBuilding className="info-icon" />
                            <div className="info-content">
                                <span className="info-label">Type</span>
                                <span className="info-value">{property.type}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaHome className="info-icon" />
                            <div className="info-content">
                                <span className="info-label">Status</span>
                                <span className="info-value">{property.status}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaCalendar className="info-icon" />
                            <div className="info-content">
                                <span className="info-label">Listed</span>
                                <span className="info-value">
                                    {new Date(property.day_of_listing).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="property-section">
                        <h3 className="title">Property Details</h3>
                        <div className="flex">
                            <div className="box">
                                {leftColumnDetails.map((detail, index) => (
                                    <div className="detail-item" key={index}>
                                        <span className="detail-icon">{detail.icon}</span>
                                        <div className="detail-content">
                                            <span className="detail-label">{detail.label}</span>
                                            <span className="detail-value">{detail.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="box">
                                {rightColumnDetails.map((detail, index) => (
                                    <div className="detail-item" key={index}>
                                        <span className="detail-icon">{detail.icon}</span>
                                        <div className="detail-content">
                                            <span className="detail-label">{detail.label}</span>
                                            <span className="detail-value">{detail.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="property-section">
                        <h3 className="title">Amenities</h3>
                        <div className="flex">
                            <div className="box">
                                {amenities.slice(0, 6).map((amenity, index) => (
                                    <div className="amenity-item" key={index}>
                                        {amenity.available ? (
                                            <FaCheck className="amenity-icon available" />
                                        ) : (
                                            <FaTimes className="amenity-icon unavailable" />
                                        )}
                                        <span>{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="box">
                                {amenities.slice(6, 12).map((amenity, index) => (
                                    <div className="amenity-item" key={index}>
                                        {amenity.available ? (
                                            <FaCheck className="amenity-icon available" />
                                        ) : (
                                            <FaTimes className="amenity-icon unavailable" />
                                        )}
                                        <span>{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="property-section">
                        <h3 className="title">Description</h3>
                        <p className="description">{property.description}</p>
                    </div>

                    <button className="Schedule-btn" onClick={() => navigate(`/schedule/${id}`)}>Schedule a visit &#10137;</button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default PropertyDetails;
