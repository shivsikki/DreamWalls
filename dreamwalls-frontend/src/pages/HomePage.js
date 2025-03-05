import React from "react";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import Services from "../components/Services";
import Listings from "../components/Listings";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <SearchForm />
        <Services />
        <Listings />
        <Footer />
    </div>
  );
};

export default HomePage;