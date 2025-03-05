import React, { useState } from "react";
import "../styles/SellFormPage.css"
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
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Here you can add the code to send this data to your backend or database
  };

  return (
    <div className="form-container">
      <h1>Luxury Villa Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Owner:
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone No:
          <input
            type="text"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </label>
        <label>
          Sale:
          <input
            type="checkbox"
            name="sale"
            checked={formData.sale}
            onChange={handleChange}
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
          Rooms:
          <input
            type="number"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </label>
        <label>
          Bedrooms:
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Bathrooms:
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Kitchen:
          <input
            type="number"
            name="kitchen"
            value={formData.kitchen}
            onChange={handleChange}
          />
        </label>
        <label>
          Total Floors:
          <input
            type="number"
            name="total_floors"
            value={formData.total_floors}
            onChange={handleChange}
          />
        </label>
        <label>
          Furnished:
          <input
            type="text"
            name="furnished"
            value={formData.furnished}
            onChange={handleChange}
          />
        </label>
        <label>
          Interior:
          <input
            type="text"
            name="interior"
            value={formData.interior}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>

        {/* Checkboxes for true/false values */}
        <label>
          Lifts:
          <input
            type="checkbox"
            name="lifts"
            checked={formData.lifts}
            onChange={handleChange}
          />
        </label>
        <label>
          Security Guards:
          <input
            type="checkbox"
            name="security_guards"
            checked={formData.security_guards}
            onChange={handleChange}
          />
        </label>
        <label>
          Playground:
          <input
            type="checkbox"
            name="play_ground"
            checked={formData.play_ground}
            onChange={handleChange}
          />
        </label>
        <label>
          Gardens:
          <input
            type="checkbox"
            name="gardens"
            checked={formData.gardens}
            onChange={handleChange}
          />
        </label>
        <label>
          Water Supply:
          <input
            type="checkbox"
            name="water_supply"
            checked={formData.water_supply}
            onChange={handleChange}
          />
        </label>
        <label>
          Power Backup:
          <input
            type="checkbox"
            name="power_backup"
            checked={formData.power_backup}
            onChange={handleChange}
          />
        </label>
        <label>
          Parking:
          <input
            type="checkbox"
            name="parking"
            checked={formData.parking}
            onChange={handleChange}
          />
        </label>
        <label>
          Gym:
          <input
            type="checkbox"
            name="gym"
            checked={formData.gym}
            onChange={handleChange}
          />
        </label>
        <label>
          Shopping Mall:
          <input
            type="checkbox"
            name="shopping_mall"
            checked={formData.shopping_mall}
            onChange={handleChange}
          />
        </label>
        <label>
          Hospitals:
          <input
            type="checkbox"
            name="hospitals"
            checked={formData.hospitals}
            onChange={handleChange}
          />
        </label>
        <label>
          Schools:
          <input
            type="checkbox"
            name="schools"
            checked={formData.schools}
            onChange={handleChange}
          />
        </label>
        <label>
          Market Area:
          <input
            type="checkbox"
            name="market_area"
            checked={formData.market_area}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellFormPage;