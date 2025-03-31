import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import '../styles/PropertyListing.css';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [propertyDetails, setPropertyDetails] = useState({});
    const location = useLocation();
    const [searchParams] = useSearchParams();
    
    const isRentMode = location.pathname === '/rent';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = isRentMode ? 
                    'http://localhost:5000/api/v1/properties?sale=false' : 
                    'http://localhost:5000/api/v1/properties?sale=true';
                
                const propertiesResponse = await fetch(endpoint);
                const propertiesData = await propertiesResponse.json();
                
                const detailsResponse = await fetch('http://localhost:5000/api/v1/property-details');
                const detailsData = await detailsResponse.json();

                const detailsMap = {};
                if (Array.isArray(detailsData.data)) {
                    detailsData.data.forEach(detail => {
                        detailsMap[detail.property_id] = detail;
                    });
                }

                const propertyArray = Array.isArray(propertiesData) ? propertiesData : 
                                    propertiesData.data ? propertiesData.data : [];

                setPropertyDetails(detailsMap);
                setProperties(propertyArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [isRentMode]);

    useEffect(() => {
        if (properties.length === 0) return;

        let filtered = [...properties];

        const location = searchParams.get('location');
        const type = searchParams.get('type');
        const bedrooms = searchParams.get('bedrooms');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        // Filter by location
        if (location) {
            filtered = filtered.filter(property => {
                const searchLocation = location.toLowerCase().trim();
                const propertyLocation = property.location?.toLowerCase().trim() || '';
                const locationParts = propertyLocation.split(',').map(part => part.trim());
                return locationParts.some(part => part.includes(searchLocation));
            });
        }

        // Filter by type
        if (type) {
            filtered = filtered.filter(property => 
                property.type?.toLowerCase() === type.toLowerCase()
            );
        }

        // Filter by bedrooms
        if (bedrooms) {
            filtered = filtered.filter(property => {
                const propertyBedrooms = parseInt(property.bedrooms) || 0;
                const selectedBedrooms = parseInt(bedrooms);
                return propertyBedrooms <= selectedBedrooms;
            });
        }

        // Filter by price
        if (minPrice || maxPrice) {
            filtered = filtered.filter(property => {
                const propertyDetail = propertyDetails[property.id];
                const propertyPrice = parseInt(propertyDetail?.buy_price) || 0;
                const meetsMinPrice = !minPrice || propertyPrice >= parseInt(minPrice);
                const meetsMaxPrice = !maxPrice || propertyPrice <= parseInt(maxPrice);
                return meetsMinPrice && meetsMaxPrice;
            });
        }

        setFilteredProperties(filtered);
    }, [properties, searchParams, propertyDetails]);

    return (
        <div className="property-listing">
            <Navbar />
            <div className="properties-container">
                {!filteredProperties || filteredProperties.length === 0 ? (
                    <div className="no-properties">
                        <h3>No properties found matching your criteria</h3>
                        <p>Try adjusting your filters or browse all properties</p>
                    </div>
                ) : (
                    <div className="properties-grid">
                        {filteredProperties.map(property => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                                propertyDetails={propertyDetails[property.id]}
                                isRentMode={isRentMode}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PropertyListing;