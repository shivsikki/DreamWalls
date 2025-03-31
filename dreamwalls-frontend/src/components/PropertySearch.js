import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

const PropertySearch = ({ onPropertySelect }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/v1/properties');
                const data = await response.json();
                const options = data.map(property => ({
                    value: property.id,
                    label: property.name,
                    property: property
                }));
                setProperties(options);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
            setLoading(false);
        };

        fetchProperties();
    }, []);

    const handleSelect = (value, option) => {
        onPropertySelect(option.property);
    };

    return (
        <Select
            showSearch
            placeholder="Search for a property"
            loading={loading}
            style={{ width: '100%' }}
            options={properties}
            onChange={handleSelect}
            filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
            }
        />
    );
};

export default PropertySearch; 