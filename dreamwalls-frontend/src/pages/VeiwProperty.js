import React from "react";
import { FaMapMarkerAlt, FaTag, FaUser, FaPhone, FaBuilding, FaHome, FaCalendar, FaCheck, FaTimes } from "react-icons/fa";
import "../styles/ViewProperty.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import houseImg1 from "../assets/images/house-img-1.webp";
import houseImg2 from "../assets/images/bathroom-img-1.webp";
import houseImg3 from "../assets/images/kitchen-img-1.webp";
import houseImg4 from "../assets/images/hall-img-1.webp";

const PropertyDetails = () => {
    return (
        <div>
            <Navbar />
            <section className="view-property">
                <div className="details">
                    {/* Property Images */}
                    <div className="thumb">
                        <div className="big-image">
                            <img src={houseImg1} alt="Property" />
                        </div>
                        <div className="small-images">
                            <img src={houseImg1} alt="Small Property 1" />
                            <img src={houseImg2} alt="Small Property 2" />
                            <img src={houseImg3} alt="Small Property 3" />
                            <img src={houseImg4} alt="Small Property 4" />
                        </div>
                    </div>

                    {/* Property Info */}
                    <h3 className="name">Modern Flats and Apartments</h3>
                    <p className="location">
                        <FaMapMarkerAlt /> <span>Andheri, Mumbai, India - 400104</span>
                    </p>

                    <div className="info">
                        <p><FaTag /> <span>15 Lac</span></p>
                        <p><FaUser /> <span>John Deo (Owner)</span></p>
                        <p><FaPhone /> <a href="tel:1234567890">1234567890</a></p>
                        <p><FaBuilding /> <span>Flat</span></p>
                        <p><FaHome /> <span>Sale</span></p>
                        <p><FaCalendar /> <span>10-11-2022</span></p>
                    </div>

                    {/* Property Details */}
                    <h3 className="title">details</h3>
                    <div className="flex">
                        <div className="box">
                            <p><strong>rooms:</strong> <span>2 BHK</span></p>
                            <p><strong>deposit Amount:</strong> <span>0</span></p>
                            <p><strong>status:</strong> <span>Ready to Move</span></p>
                            <p><strong>bedroom:</strong> <span>3</span></p>
                            <p><strong>bathroom:</strong> <span>2</span></p>
                            <p><strong>balcony:</strong> <span>1</span></p>
                        </div>
                        <div className="box">
                            <p><strong>carpet Area:</strong> <span>750 sqft</span></p>
                            <p><strong>age:</strong> <span>3 years</span></p>
                            <p><strong>room Floor:</strong> <span>3</span></p>
                            <p><strong>total Floors:</strong> <span>22</span></p>
                            <p><strong>furnished:</strong> <span>Semi-furnished</span></p>
                            <p><strong>loan:</strong> <span>Available</span></p>
                        </div>
                    </div>

                    {/* Amenities */}
                    <h3 className="title">Amenities</h3>
                    <div className="flex">
                        <div className="box">
                            <p><FaCheck /> <span>Lifts</span></p>
                            <p><FaCheck /> <span>Security Guards</span></p>
                            <p><FaTimes /> <span>Play Ground</span></p>
                            <p><FaCheck /> <span>Gardens</span></p>
                            <p><FaCheck /> <span>Water Supply</span></p>
                            <p><FaCheck /> <span>Power Backup</span></p>
                        </div>
                        <div className="box">
                            <p><FaCheck /> <span>Parking Area</span></p>
                            <p><FaTimes /> <span>Gym</span></p>
                            <p><FaCheck /> <span>Shopping Mall</span></p>
                            <p><FaCheck /> <span>Hospital</span></p>
                            <p><FaCheck /> <span>Schools</span></p>
                            <p><FaCheck /> <span>Market Area</span></p>
                        </div>
                    </div>
                    <h3 className="title">Description</h3>
                    <p className="description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cupiditate aliquid ipsum recusandae maxime nisi, velit eaque, libero, exercitationem culpa accusamus. Neque dolor quaerat modi saepe facere dignissimos temporibus molestias.
                    </p>
                    <button className="btn" >save property &#10137;</button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default PropertyDetails;
