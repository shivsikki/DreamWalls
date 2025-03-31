import React from "react";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import Services from "../components/Services";
import Listings from "../components/Listings";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handlePropertyClick = (propertyId) => {
    navigate(`/view-property/${propertyId}`);
  };

  const handleSearchSubmit = (searchParams) => {
    navigate('/properties', { state: { searchParams } });
  };

  return (
    <div>
      <Navbar />
      <SearchForm onSearch={handleSearchSubmit} />
      <Services />
      <Listings onPropertyClick={handlePropertyClick} />
      <Footer />
    </div>
  );
};

export default HomePage;