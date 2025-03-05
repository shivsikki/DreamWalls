import React, { useState } from 'react';
import { Select } from 'antd';
import image from '../assets/images/interior1.jpg';

const PropertySearch = ({ onPropertySelect }) => {
    const [searchValue, setSearchValue] = useState('');
    const [properties, setProperties] = useState([]);

    const handleSearch = async (value) => {
        setSearchValue(value);
        // Sample data with all required properties
        setProperties([
            { 
                id: '1', 
                title: 'Sample Property 1',
                images: [image],
                price: 500000,
                area: 2000,
                bedrooms: 3,
                bathrooms: 2,
                location: 'Sample Location 1'
            },
            { 
                id: '2', 
                title: 'Sample Property 2',
                images: [image],
                price: 750000,
                area: 2500,
                bedrooms: 4,
                bathrooms: 3,
                location: 'Sample Location 2'
            }
        ]);
    };

    return (
        <Select
            showSearch
            value={searchValue}
            placeholder="Search for a property"
            onSearch={handleSearch}
            onChange={(value) => {
                const selectedProperty = properties.find(p => p.id === value);
                onPropertySelect(selectedProperty);
            }}
            options={properties.map(property => ({
                value: property.id,
                label: property.title
            }))}
            style={{ width: '100%' }}
        />
    );
};

export default PropertySearch; 