import React, { useState, useEffect } from 'react';
import { Select, Card, Button, Empty, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropertySearch from '../components/PropertySearch';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ComparePage.css';

const ComparePage = () => {
    const [numProperties, setNumProperties] = useState(2);
    const [selectedProperties, setSelectedProperties] = useState(Array(numProperties).fill(null));
    const [propertyDetails, setPropertyDetails] = useState({});

    // Helper function to safely get property value
    const getPropertyValue = (property, key) => {
        if (!property || !property[key]) return 'N/A';
        if (typeof property[key] === 'number') {
            return property[key].toLocaleString();
        }
        return property[key];
    };

    const handlePropertySelect = async (property, index) => {
        try {
            console.log('Selected property:', property);
            
            // Check if property and property.id exist
            if (!property || !property.id) {
                console.error('Invalid property selected:', property);
                return;
            }

            // Fetch detailed property information
            const [propertyRes, detailsRes] = await Promise.all([
                fetch(`http://localhost:5000/api/v1/properties/${property.id}`),
                fetch(`http://localhost:5000/api/v1/property-details/${property.id}`)
            ]);

            // Check if responses are ok
            if (!propertyRes.ok || !detailsRes.ok) {
                throw new Error(`Failed to fetch property data: 
                    Property status: ${propertyRes.status}, 
                    Details status: ${detailsRes.status}`
                );
            }

            const propertyData = await propertyRes.json();
            const detailsData = await detailsRes.json();

            console.log('Fetched property data:', propertyData);
            console.log('Fetched details data:', detailsData);

            // Validate the data
            if (!propertyData || !detailsData.data) {
                throw new Error('Invalid data received from server');
            }

            const completeProperty = {
                ...propertyData,
                details: detailsData.data
            };

        const newProperties = [...selectedProperties];
            newProperties[index] = completeProperty;
        setSelectedProperties(newProperties);

        } catch (error) {
            console.error('Error fetching property details:', error);
            // You might want to show an error message to the user here
            message.error('Failed to load property details. Please try again.');
        }
    };

    const renderAmenityValue = (value) => {
        return value ? <span className="amenity-tick">✓</span> : <span className="amenity-cross">✗</span>;
    };

    const renderComparisonColumns = () => {
        return Array(numProperties).fill(null).map((_, index) => (
            <div key={index} className="comparison-column">
                {!selectedProperties[index] ? (
                    <div className="compare-property-selector">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={<h3>Select Property {index + 1}</h3>}
                        >
                            <PropertySearch 
                                onPropertySelect={(property) => handlePropertySelect(property, index)}
                            />
                        </Empty>
                    </div>
                ) : (
                    <Card 
                        className="compare-property-card"
                        cover={
                            selectedProperties[index]?.details?.mainImage ? (
                                <img 
                                    src={selectedProperties[index].details.mainImage.url}
                                    alt={selectedProperties[index].name}
                                    className="compare-property-image"
                                />
                            ) : (
                                <div className="no-image">No Image Available</div>
                            )
                        }
                        actions={[
                            <Button 
                                type="text" 
                                danger 
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    const newProperties = [...selectedProperties];
                                    newProperties[index] = null;
                                    setSelectedProperties(newProperties);
                                }}
                            >
                                Remove Property
                            </Button>
                        ]}
                    >
                        <h3>{getPropertyValue(selectedProperties[index], 'name')}</h3>
                        
                        <div className="compare-property-details">
                            {/* Basic Property Details */}
                            <div className="compare-section">
                                <h4>Basic Details</h4>
                            <div className="compare-detail-row">
                                <span className="compare-label">Price</span>
                                <span className="compare-value">
                                        ₹{selectedProperties[index]?.details?.buy_price 
                                            ? selectedProperties[index].details.buy_price.toLocaleString() 
                                            : 'N/A'}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Location</span>
                                    <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'location')}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Owner</span>
                                    <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'owner')}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Contact</span>
                                    <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'phone_no')}
                                    </span>
                                </div>
                            </div>

                            {/* Property Specifications */}
                            <div className="compare-section">
                                <h4>Specifications</h4>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Type</span>
                                    <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'type')}
                                </span>
                            </div>
                            <div className="compare-detail-row">
                                <span className="compare-label">Area</span>
                                <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'area')} sq ft
                                </span>
                            </div>
                            <div className="compare-detail-row">
                                <span className="compare-label">Bedrooms</span>
                                <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'bedrooms')}
                                </span>
                            </div>
                            <div className="compare-detail-row">
                                <span className="compare-label">Bathrooms</span>
                                <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'bathrooms')}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Kitchen</span>
                                    <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'kitchen')}
                                    </span>
                                </div>
                            </div>

                            {/* Property Status */}
                            <div className="compare-section">
                                <h4>Status</h4>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Furnished</span>
                                    <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'furnished')}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Status</span>
                                    <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'status')}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Interior</span>
                                    <span className="compare-value">
                                        {getPropertyValue(selectedProperties[index], 'interior')}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">For Sale</span>
                                    <span className="compare-value">
                                        {selectedProperties[index]?.sale ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="compare-section amenities-section">
                                <h4>Amenities</h4>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Lifts</span>
                                    <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.lifts)}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Gym</span>
                                    <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.gym)}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Garden</span>
                                    <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.garden)}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Swimming Pool</span>
                                    <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.swimming_pool)}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Power Backup</span>
                                    <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.power_backup)}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Security</span>
                                    <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.security)}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Children's Play Area</span>
                                    <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.play_area)}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Club House</span>
                                    <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.club_house)}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Indoor Games</span>
                                    <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.indoor_games)}
                                    </span>
                                </div>
                                <div className="compare-detail-row">
                                    <span className="compare-label">Parking</span>
                                    <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.parking)}
                                </span>
                            </div>
                            <div className="compare-detail-row">
                                    <span className="compare-label">Shopping Center</span>
                                <span className="compare-value">
                                        {renderAmenityValue(selectedProperties[index]?.shopping_center)}
                                </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        ));
    };

    return (
        <div className="compare-wrapper">
            <Navbar />
            <div className="compare-page">
                <div className="compare-header">
                    <h2>Compare Properties</h2>
                    <Select
                        value={numProperties}
                        onChange={(value) => {
                            setNumProperties(value);
                            setSelectedProperties(Array(value).fill(null));
                        }}
                        options={[
                            { value: 2, label: 'Compare 2 Properties' },
                            { value: 3, label: 'Compare 3 Properties' },
                            { value: 4, label: 'Compare 4 Properties' },
                        ]}
                        className="property-number-selector"
                    />
                </div>
                
                <div className="comparison-container">
                    {renderComparisonColumns()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ComparePage;
