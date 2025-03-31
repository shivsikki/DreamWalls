import React, { useState } from 'react';

const PropertyDetailsForm = ({ propertyId }) => {
    const [formData, setFormData] = useState({
        buy_price: '',
        rent_price: ''
    });
    const [mainImage, setMainImage] = useState(null);
    const [sideImages, setSideImages] = useState([null, null, null]); // Array of 3 nulls
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleMainImageChange = (e) => {
        if (e.target.files[0]) {
            setMainImage(e.target.files[0]);
        }
    };

    const handleSideImageChange = (index) => (e) => {
        if (e.target.files[0]) {
            const newSideImages = [...sideImages];
            newSideImages[index] = e.target.files[0];
            setSideImages(newSideImages);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate that all side images are selected
        if (!mainImage || sideImages.some(img => !img)) {
            alert('Please select all images (1 main image and 3 side images)');
            return;
        }

        setLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append('property_id', propertyId);
        formDataToSend.append('buy_price', formData.buy_price);
        formDataToSend.append('rent_price', formData.rent_price);
        
        // Add main image
        formDataToSend.append('mainImage', mainImage);

        // Add side images
        sideImages.forEach((image, index) => {
            formDataToSend.append(`sideImage${index}`, image);
        });

        try {
            const response = await fetch('http://localhost:5000/api/v1/property-details', {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Property details added successfully!');
                // Reset form
                setFormData({ buy_price: '', rent_price: '' });
                setMainImage(null);
                setSideImages([null, null, null]);
            } else {
                alert('Error adding property details');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading images');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="property-details-form">
            <div className="form-group">
                <label>Buy Price</label>
                <input
                    type="number"
                    name="buy_price"
                    value={formData.buy_price}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Rent Price</label>
                <input
                    type="number"
                    name="rent_price"
                    value={formData.rent_price}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Main Image (Required)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    required
                />
                {mainImage && (
                    <img 
                        src={URL.createObjectURL(mainImage)} 
                        alt="Main preview" 
                        style={{ width: '200px', marginTop: '10px' }} 
                    />
                )}
            </div>

            <div className="form-group">
                <label>Side Images (All 3 Required)</label>
                <div className="side-images-container">
                    {[0, 1, 2].map((index) => (
                        <div key={index} className="side-image-input">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleSideImageChange(index)}
                                required
                            />
                            {sideImages[index] && (
                                <img
                                    src={URL.createObjectURL(sideImages[index])}
                                    alt={`Side ${index + 1}`}
                                    style={{ width: '100px', marginTop: '5px' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Submit'}
            </button>
        </form>
    );
};

export default PropertyDetailsForm;