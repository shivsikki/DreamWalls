import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import '../styles/SavedProperties.css';

const SavedProperties = () => {
    const [savedProperties, setSavedProperties] = useState([]);
    const [propertyDetails, setPropertyDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedProperties = async () => {
            try {
                const userResponse = await fetch('http://localhost:5000/api/v1/users/saved-properties', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const userData = await userResponse.json();

                if (userData.success) {
                    const savedPropertyIds = userData.savedProperties.map(savedProp => 
                        savedProp.property || savedProp.propertyId || savedProp._id || savedProp.id
                    );

                    const propertiesResponse = await fetch('http://localhost:5000/api/v1/properties');
                    const propertiesData = await propertiesResponse.json();

                    const detailsResponse = await fetch('http://localhost:5000/api/v1/property-details');
                    const detailsData = await detailsResponse.json();

                    const detailsMap = {};
                    if (detailsData.data) {
                        detailsData.data.forEach(detail => {
                            detailsMap[detail.property_id] = detail;
                        });
                    }

                    const savedPropertiesData = propertiesData.filter(property => 
                        savedPropertyIds.includes(property._id)
                    );

                    setPropertyDetails(detailsMap);
                    setSavedProperties(savedPropertiesData);
                }
            } catch (error) {
                console.error('Error fetching saved properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedProperties();
    }, []);

    const handleUnsaveProperty = (propertyId) => {
        setSavedProperties(prev => prev.filter(prop => prop._id !== propertyId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="saved-properties">
            <Navbar />
            <div className="saved-properties-container">
                <h1>Saved Properties</h1>
                {savedProperties.length === 0 ? (
                    <div className="no-saved-properties">
                        <h3>No saved properties</h3>
                        <p>Properties you save will appear here</p>
                    </div>
                ) : (
                    <div className="saved-properties-grid">
                        {savedProperties.map(property => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                                propertyDetails={propertyDetails[property.id]}
                                onSaveProperty={handleUnsaveProperty}
                                isSaved={true}
                                isRentMode={false}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SavedProperties; 