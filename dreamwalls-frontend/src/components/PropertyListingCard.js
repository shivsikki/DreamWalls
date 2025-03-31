import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PropertyListingCard.css';

const PropertyListingCard = ({ property }) => {
  const navigate = useNavigate();
  const propertyTypes = property?.type 
    ? (Array.isArray(property.type) ? property.type : [property.type]) 
    : [];

  const handleViewProperty = () => {
    navigate(`/view-property/${property.id}`);
  };

  return (
    <div className="property-listing-card">
      <div className="admin-info">
        <div className="admin-avatar">{property?.admin || 'U'}</div>
        <div className="admin-details">
          <p className="admin-name">{property?.name || 'Unknown'}</p>
          <span className="admin-date">{property?.date || 'No date'}</span>
        </div>
      </div>

      <div className="property-thumb">
        <div className="image-count">
          <i className="far fa-image"></i>
          <span>4</span>
        </div>
        <div className="property-type">
          {propertyTypes.map((type, index) => (
            <span key={index} className="type-tag">{type}</span>
          ))}
        </div>
        <button className="favorite-btn">
          <i className="far fa-heart"></i>
        </button>
        <img 
          src={property?.img || 'default-property-image.jpg'} 
          alt={property?.title || 'Property'} 
        />
      </div>

      <h3 className="property-title">{property?.title || 'Untitled Property'}</h3>
      <p className="property-location">
        <i className="fas fa-map-marker-alt"></i>
        <span>{property?.location || 'Location not specified'}</span>
      </p>

      <div className="property-features">
        <div className="feature">
          <i className="fas fa-bed"></i>
          <span>{property?.beds || '0'}</span>
        </div>
        <div className="feature">
          <i className="fas fa-bath"></i>
          <span>{property?.baths || '0'}</span>
        </div>
        <div className="feature">
          <i className="fas fa-spoon"></i>
          <span>{property?.kitchen || 'N/A'}</span>
        </div>
      </div>

      <button 
        className="view-property-btn"
        onClick={handleViewProperty}
      >
        View Property
      </button>
    </div>
  );
};

export default PropertyListingCard;
