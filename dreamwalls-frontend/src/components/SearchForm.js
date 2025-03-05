import React, { useState } from "react";
import "../styles/SearchForm.css";

const SearchForm = () => {
  const [formData, setFormData] = useState({
    location: "",
    type: "flat",
    bhk: "1",
    minimum: "5000000",
    maximum: "5000000",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can integrate API calls or navigation for search resul  ts
  };

  const scrolltolisting = (e) =>{

  };

  return (
    <div className="search-form-container">
      <div className="search-col">
        <div className="search-written">
          <h1>Buy, Sell, Rent property as u wish...</h1>
          <h2>Here, For FREE</h2>
          <p>Its your home, your Choice</p>
          <button className="cssbuttons-io-button">
            Get started
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className="search-col">
        <section className="search-center">
          <form onSubmit={handleSubmit}>
            <h3>Find A Perfect Home For You</h3>
            <div className="search-box">
              <p>Enter Location <span>*</span></p>
              <input
                type="text"
                name="location"
                required
                maxLength="50"
                placeholder="Enter city name"
                className="search-input"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="search-flex">
              <div className="search-box">
                <p>Property Type <span>*</span></p>
                <select name="type" className="search-input" required value={formData.type} onChange={handleChange}>
                  <option value="flat">Flat</option>
                  <option value="house">House</option>
                  <option value="shop">Shop</option>
                </select>
              </div>

              <div className="search-box">
                <p>How Many BHK <span>*</span></p>
                <select name="bhk" className="search-input" required value={formData.bhk} onChange={handleChange}>
                  {[...Array(9)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} BHK</option>
                  ))}
                </select>
              </div>

              <div className="search-box">
                <p>Minimum Budget <span>*</span></p>
                <select name="minimum" className="search-input" required value={formData.minimum} onChange={handleChange}>
                  {[5000000, 10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 150000000, 200000000].map((value) => (
                    <option key={value} value={value}>{value >= 10000000 ? `${value / 10000000} Cr` : `${value / 100000} lac`}</option>
                  ))}
                </select>
              </div>

              <div className="search-box">
                <p>Maximum Budget <span>*</span></p>
                <select name="maximum" className="search-input" required value={formData.maximum} onChange={handleChange}>
                  {[5000000, 10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 150000000, 200000000].map((value) => (
                    <option key={value} value={value}>{value >= 10000000 ? `${value / 10000000} Cr` : `${value / 100000} lac`}</option>
                  ))}
                </select>
              </div>
            </div>

            <input type="submit" value="Search Property" name="search" className="search-btn" />
          </form>
        </section>
      </div>
    </div>
  );
};

export default SearchForm;
