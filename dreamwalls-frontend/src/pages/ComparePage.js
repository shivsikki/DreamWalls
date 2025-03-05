import React, { useState } from 'react';
import { Select, Card, Button } from 'antd';
import PropertySearch from '../components/PropertySearch';
import '../styles/ComparePage.css';

const ComparePage = () => {
    const [numProperties, setNumProperties] = useState(2);
    const [selectedProperties, setSelectedProperties] = useState(Array(4).fill(null));

    const handlePropertySelect = (property, index) => {
        const newProperties = [...selectedProperties];
        newProperties[index] = property;
        setSelectedProperties(newProperties);
    };

    const renderComparisonColumns = () => {
        return Array(numProperties).fill(null).map((_, index) => (
            <div key={index} className="comparison-column">
                {!selectedProperties[index] ? (
                    <div className="compare-property-selector">
                        <h3>Select Property {index + 1}</h3>
                        <PropertySearch 
                            onPropertySelect={(property) => handlePropertySelect(property, index)}
                        />
                    </div>
                ) : (
                    <Card className="compare-property-card">
                        <img 
                            src={selectedProperties[index].images[0]} 
                            alt={selectedProperties[index].title}
                            className="compare-property-image"
                        />
                        <h3>{selectedProperties[index].title}</h3>
                        
                        <div className="compare-property-details">
                            <div className="compare-detail-row">
                                <span className="compare-label">Price:</span>
                                <span className="compare-value">${selectedProperties[index].price}</span>
                            </div>
                            <div className="compare-detail-row">
                                <span className="compare-label">Area:</span>
                                <span className="compare-value">{selectedProperties[index].area} sq ft</span>
                            </div>
                            <div className="compare-detail-row">
                                <span className="compare-label">Bedrooms:</span>
                                <span className="compare-value">{selectedProperties[index].bedrooms}</span>
                            </div>
                            <div className="compare-detail-row">
                                <span className="compare-label">Bathrooms:</span>
                                <span className="compare-value">{selectedProperties[index].bathrooms}</span>
                            </div>
                            <div className="compare-detail-row">
                                <span className="compare-label">Location:</span>
                                <span className="compare-value">{selectedProperties[index].location}</span>
                            </div>
                        </div>
                        
                        <Button 
                            type="text" 
                            danger 
                            onClick={() => handlePropertySelect(null, index)}
                        >
                            Remove
                        </Button>
                    </Card>
                )}
            </div>
        ));
    };

    return (
        <div className="compare-page">
            <div className="compare-header">
                <h2>Compare Properties</h2>
                <Select
                    value={numProperties}
                    onChange={setNumProperties}
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
    );
};

export default ComparePage;
