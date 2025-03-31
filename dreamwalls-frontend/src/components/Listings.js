import React, { useState, useEffect } from 'react';
import PropertyListingCard from './PropertyListingCard';
import "../styles/Listing.css";

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPropertiesAndDetails = async () => {
      try {
        const propertiesResponse = await fetch('http://localhost:5000/api/v1/properties');
        const propertiesData = await propertiesResponse.json();
        console.log("Properties Data:", propertiesData);

        const detailsResponse = await fetch('http://localhost:5000/api/v1/property-details');
        const detailsData = await detailsResponse.json();
        console.log("Details Data:", detailsData);

        const propertiesArray = Array.isArray(propertiesData) ? propertiesData : 
          (propertiesData.properties || propertiesData.data || []);
        
        const detailsArray = Array.isArray(detailsData) ? detailsData : 
          (detailsData.propertyDetails || detailsData.data || []);

        const combinedProperties = propertiesArray.map(property => {
          const details = detailsArray.find(detail => detail.property_id === property.id) || {};
          return {
            ...property,
            mainImage: details.mainImage?.url || null,
            sideImages: details.sideImages?.map(img => img.url) || [],
            buy_price: details.buy_price,
            rent_price: details.rent_price,
            type: [property.type || 'unknown', property.sale ? 'sale' : 'rent'],
            date: property.day_of_listing ? new Date(property.day_of_listing).toLocaleDateString() : 'No date',
            img: details.mainImage?.url || property.mainImage || 'default-image.jpg',
            area: `${property.quantity || 0} sqft`
          };
        });

        console.log("Combined Properties:", combinedProperties);
        setProperties(combinedProperties);

      } catch (error) {
        console.error('Error fetching properties and details:', error);
        setProperties([]);
      }
    };
    fetchPropertiesAndDetails();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === 0 ? properties.length - 1 : prevIndex - 1;
        return Math.max(0, Math.min(newIndex, properties.length - 1));
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === properties.length - 1 ? 0 : prevIndex + 1;
        return Math.max(0, Math.min(newIndex, properties.length - 1));
    });
  };

  return (
    <section className="listings">
      <h1 className="heading">Latest Listings</h1>
      
      <div className="carousel-container">
        <button 
          className="carousel-btn prev" 
          onClick={handlePrevious}
          disabled={properties.length <= 1}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="carousel-wrapper">
          <div 
            className="carousel-track" 
            style={{
              transform: `translateX(-${currentIndex * 33.5}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {properties.map((property, index) => (
              <div key={property._id || index} className="carousel-item">
                <PropertyListingCard 
                  property={{
                    ...property,
                    admin: property.owner?.charAt(0) || 'U',
                    name: property.owner || 'Unknown',
                    title: property.name || 'Untitled Property',
                    beds: property.bedrooms || 0,
                    baths: property.bathrooms || 0,
                    location: property.location || 'Location not specified'
                  }} 
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-btn next" 
          onClick={handleNext}
          disabled={properties.length <= 1}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {properties.length === 0 && (
        <div className="no-properties">
          <p>No properties found</p>
        </div>
      )}
    </section>
  );
};

export default Listings;
