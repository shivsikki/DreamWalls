import React, { useState } from "react";
import "../styles/SellFormPage.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const SellFormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    owner: "",
    phone_no: "",
    type: "",
    sale: false,
    day_of_listing: "",
    rooms: "",
    status: "",
    bedrooms: "",
    bathrooms: "",
    kitchen: "",
    total_floors: "",
    furnished: "",
    interior: "",
    quantity: "",
    lifts: false,
    security_guards: false,
    play_ground: false,
    gardens: false,
    water_supply: false,
    power_backup: false,
    parking: false,
    gym: false,
    shopping_mall: false,
    hospitals: false,
    schools: false,
    market_area: false,
    description: "",
    buy_price: "",
    rent_price: "",
    mainImage: null,
    sideImages: [null, null, null]
  });

  const [imagePreviews, setImagePreviews] = useState({
    mainImage: null,
    sideImages: [null, null, null]
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("side_image_")) {
      const index = parseInt(name.split("_")[2], 10);
      const newSideImages = [...formData.sideImages];
      const file = e.target.files[0];
      newSideImages[index] = file;
      setImagePreviews((prev) => {
        const newPreviews = [...prev.sideImages];
        newPreviews[index] = URL.createObjectURL(file);
        return { ...prev, sideImages: newPreviews };
      });
      setFormData((prevData) => ({
        ...prevData,
        sideImages: newSideImages
      }));
    } else if (name === "main_image") {
      const file = e.target.files[0];
      setImagePreviews((prev) => ({
        ...prev,
        mainImage: URL.createObjectURL(file)
      }));
      setFormData((prevData) => ({
        ...prevData,
        mainImage: file
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset"); 

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dcdfszjo4/image/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        url: data.secure_url,
        public_id: data.public_id
      };
    } catch (error) {
      console.error("Image upload error:", error);
      return {
        url: "https://placeholder.com/image.jpg",
        public_id: "placeholder_id"
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button pressed");

    try {
        // 1. Upload main image to Cloudinary
        if (!formData.mainImage) {
            throw new Error('Main image is required');
        }

        console.log("Uploading main image...");
        const mainImageData = await uploadImage(formData.mainImage);
        console.log("Main image uploaded:", mainImageData);

        // 2. Upload side images to Cloudinary
        console.log("Uploading side images...");
        const sideImagesData = [];
        for (const sideImage of formData.sideImages) {
            if (sideImage) {
                const imageData = await uploadImage(sideImage);
                console.log("Side image uploaded:", imageData);
                if (imageData.url && imageData.public_id) {
                    sideImagesData.push({
                        url: imageData.url,
                        public_id: imageData.public_id
                    });
                }
            }
        }

        // 3. Prepare property data (no need to include id, it will be generated on the backend)
        const propertyData = {
            name: formData.name,
            location: formData.location,
            owner: formData.owner,
            phone_no: formData.phone_no,
            type: formData.type,
            sale: Boolean(formData.sale),
            day_of_listing: formData.day_of_listing || new Date().toISOString(),
            rooms: Number(formData.rooms) || 0,
            status: formData.status,
            bedrooms: Number(formData.bedrooms) || 0,
            bathrooms: Number(formData.bathrooms) || 0,
            kitchen: Number(formData.kitchen) || 0,
            total_floors: Number(formData.total_floors) || 0,
            furnished: formData.furnished,
            interior: formData.interior,
            quantity: Number(formData.quantity) || 0,
            lifts: Boolean(formData.lifts),
            security_guards: Boolean(formData.security_guards),
            play_ground: Boolean(formData.play_ground),
            gardens: Boolean(formData.gardens),
            water_supply: Boolean(formData.water_supply),
            power_backup: Boolean(formData.power_backup),
            parking: Boolean(formData.parking),
            gym: Boolean(formData.gym),
            shopping_mall: Boolean(formData.shopping_mall),
            hospitals: Boolean(formData.hospitals),
            schools: Boolean(formData.schools),
            market_area: Boolean(formData.market_area),
            description: formData.description || ''
        };

        // 4. Prepare property details data (no need to include property_id)
        const propertyDetailsData = {
            mainImage: {
                url: mainImageData.url,
                public_id: mainImageData.public_id
            },
            sideImages: sideImagesData,
            buy_price: Number(formData.buy_price) || 0,
            rent_price: Number(formData.rent_price) || 0
        };

        const payload = {
            propertyData,
            propertyDetailsData
        };

        console.log("Sending data to backend:", payload);

        const response = await fetch('http://localhost:5000/api/v1/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const responseData = await response.json();
        console.log("Backend response:", responseData);

        if (!response.ok) {
            throw new Error(responseData.error || 'Failed to create property');
        }

        console.log('Property created successfully:', responseData);
        navigate('/properties');
        
    } catch (error) {
        console.error('Error submitting form: ', error);
        setError(error.message);
    }
  };

  return (
    <div className="sell-form-page">
      <Navbar className="navbar"/>
      <div className="sell-form-container">
        <h1>Fill the details to list your property</h1>
        <form onSubmit={handleSubmit}>
        <h2 className="section-header">Basic Information</h2>
        <label>
          Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter property name"
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter property location"
            />
          </label>
          <label>
            Owner:
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              placeholder="Enter owner name"
            />
          </label>
          <label>
            Phone No:
            <input
              type="text"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              placeholder="Enter contact number"
            />
          </label>

          <h2 className="section-header">Property Details</h2>
          <label>
            Type: (house/flat/etc) 
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Enter property type"
            />
          </label>
          <label>
            Status: (available/sold/under construction/etc)
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Enter property status"
            />
          </label>
          <label>
            Day of Listing:
            <input
              type="date"
              name="day_of_listing"
              value={formData.day_of_listing}
              onChange={handleChange}
            />
          </label>
          <label>
            Sale:
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="sale"
                checked={formData.sale}
                onChange={handleChange}
              />
              <span>Available for Sale</span>
            </div>
          </label>

          <h2 className="section-header">Pricing</h2>
          <label>
            Buy Price:
            <input
              type="number"
              name="buy_price"
              value={formData.buy_price}
              onChange={handleChange}
              placeholder="Enter buy price"
            />
          </label>
          <label>
            Rent Price:
            <input
              type="number"
              name="rent_price"
              value={formData.rent_price}
              onChange={handleChange}
              placeholder="Enter rent price"
            />
          </label>

          <h2 className="section-header">Property Specifications</h2>
          <label>
            Rooms:
            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              placeholder="Number of rooms"
            />
          </label>
          <label>
            Bedrooms:
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Number of bedrooms"
            />
          </label>
          <label>
            Bathrooms:
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="Number of bathrooms"
            />
          </label>
          <label>
            Kitchen:
            <input
              type="number"
              name="kitchen"
              value={formData.kitchen}
              onChange={handleChange}
              placeholder="Number of kitchens"
            />
          </label>
          <label>
            Total Floors:
            <input
              type="number"
              name="total_floors"
              value={formData.total_floors}
              onChange={handleChange}
              placeholder="Total number of floors"
            />
          </label>
          <label>
            Furnished: (semi/full/none/etc)
            <input
              type="text"
              name="furnished"
              value={formData.furnished}
              onChange={handleChange}
              placeholder="Furnishing status"
            />
          </label>
          <label>
            Interior:
            <input
              type="text"
              name="interior"
              value={formData.interior}
              onChange={handleChange}
              placeholder="Interior details"
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity available"
            />
          </label>

          <h2 className="section-header">Images</h2>
          <label>
            Main Image:
            <input
              type="file"
              name="main_image"
              onChange={handleChange}
              accept="image/*"
            />
          </label>
          <label>
            Side Image 1:
            <input
              type="file"
              name="side_image_0"
              onChange={handleChange}
              accept="image/*"
            />
          </label>
          <label>
            Side Image 2:
            <input
              type="file"
              name="side_image_1"
              onChange={handleChange}
              accept="image/*"
            />
          </label>
          <label>
            Side Image 3:
            <input
              type="file"
              name="side_image_2"
              onChange={handleChange}
              accept="image/*"
            />
          </label>

          <h2 className="section-header">Amenities</h2>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="lifts"
              checked={formData.lifts}
              onChange={handleChange}
            />
            <span>Lifts</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="security_guards"
              checked={formData.security_guards}
              onChange={handleChange}
            />
            <span>Security Guards</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="play_ground"
              checked={formData.play_ground}
              onChange={handleChange}
            />
            <span>Playground</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="gardens"
              checked={formData.gardens}
              onChange={handleChange}
            />
            <span>Gardens</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="water_supply"
              checked={formData.water_supply}
              onChange={handleChange}
            />
            <span>Water Supply</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="power_backup"
              checked={formData.power_backup}
              onChange={handleChange}
            />
            <span>Power Backup</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="parking"
              checked={formData.parking}
              onChange={handleChange}
            />
            <span>Parking</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="gym"
              checked={formData.gym}
              onChange={handleChange}
            />
            <span>Gym</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="shopping_mall"
              checked={formData.shopping_mall}
              onChange={handleChange}
            />
            <span>Shopping Mall</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="hospitals"
              checked={formData.hospitals}
              onChange={handleChange}
            />
            <span>Hospitals</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="schools"
              checked={formData.schools}
              onChange={handleChange}
            />
            <span>Schools</span>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="market_area"
              checked={formData.market_area}
              onChange={handleChange}
            />
            <span>Market Area</span>
          </div>

          <h2 className="section-header">Additional Information</h2>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter detailed property description"
            />
          </label>

          <button className="sell-form-button" type="submit">Submit Property</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SellFormPage;