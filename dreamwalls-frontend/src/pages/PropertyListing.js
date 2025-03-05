import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import '../styles/PropertyListing.css';

const PropertyListing = () => {
    // State for filters
    const [filters, setFilters] = useState({
        propertyType: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        location: ''
    });

    // State for properties
    const [properties, setProperties] = useState([
        {
            id: 1,
            title: 'Luxury Apartment in Downtown',
            description: 'Spacious 2BHK apartment with modern amenities',
            price: 450000,
            bedrooms: 2,
            bathrooms: 2,
            area: 1200,
            location: 'Downtown',
            image: '/path/to/image1.jpg'
        },
        {
            id: 2,
            title: 'Suburban Family Home',
            description: 'Comfortable 3BHK house in a quiet neighborhood',
            price: 750000,
            bedrooms: 3,
            bathrooms: 3,
            area: 2000,
            location: 'Suburbs',
            image: '/path/to/image2.jpg'
        },
        // Add more properties as needed
    ]);

    // Filtered properties based on filters
    const [filteredProperties, setFilteredProperties] = useState(properties);

    // Filter change handler
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    // Apply filters effect
    useEffect(() => {
        const filtered = properties.filter(property => {
            return (
                (filters.propertyType === '' || property.type === filters.propertyType) &&
                (filters.minPrice === '' || property.price >= parseInt(filters.minPrice)) &&
                (filters.maxPrice === '' || property.price <= parseInt(filters.maxPrice)) &&
                (filters.bedrooms === '' || property.bedrooms === parseInt(filters.bedrooms)) &&
                (filters.location === '' || property.location.toLowerCase().includes(filters.location.toLowerCase()))
            );
        });

        setFilteredProperties(filtered);
    }, [filters, properties]);

    return (
        <div className="property-listing">
            <Navbar />
            <div className="filters-container">
                <div className="filter-group">
                    <select
                        name="propertyType"
                        value={filters.propertyType}
                        onChange={handleFilterChange}
                    >
                        <option value="">Property Type</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                    </select>

                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                    />

                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                    />

                    <select
                        name="bedrooms"
                        value={filters.bedrooms}
                        onChange={handleFilterChange}
                    >
                        <option value="">Bedrooms</option>
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4+ Bedrooms</option>
                    </select>

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={filters.location}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            <div className="properties-container">
                {filteredProperties.map(property => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default PropertyListing;