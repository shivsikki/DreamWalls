import React from 'react';
import '../styles/PropertyCard.css';
import img from '../assets/images/interior2.jpg';
const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <div className="property-image">
                <img src={img} alt={property.title} />
            </div>
            <div className="property-details">
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <div className="property-specs">
                    <div className="spec">
                        <i className="icon-bed"></i>
                        <span>{property.bedrooms} Bedrooms</span>
                    </div>
                    <div className="spec">
                        <i className="icon-bath"></i>
                        <span>{property.bathrooms} Bathrooms</span>
                    </div>
                    <div className="spec">
                        <i className="icon-area"></i>
                        <span>{property.area} sq ft</span>
                    </div>
                </div>
                <div className="property-footer">
                    <div className="property-price">
                        ${property.price.toLocaleString()}
                    </div>
                    <button className="view-details-btn">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;