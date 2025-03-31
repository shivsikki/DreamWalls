import React from "react";
import "../styles/Services.css";
import service1 from "../assets/images/icon-1.png";
import service2 from "../assets/images/icon-2.png";
import service3 from "../assets/images/icon-3.png";
import service4 from "../assets/images/icon-4.png";
import service5 from "../assets/images/icon-5.png";
import service6 from "../assets/images/icon-6.png";

const Services = () => {
    // Array of service objects with unique content
    const services = [
        {
            id: 1,
            icon: service1,
            title: "Buy House",
            description: "Find your dream home with our extensive property listings and expert guidance."
        },
        {
            id: 2,
            icon: service2,
            title: "Rent House",
            description: "Discover the perfect rental property that suits your lifestyle and budget."
        },
        {
            id: 3,
            icon: service3,
            title: "Sell House",
            description: "Get the best value for your property with our professional selling services."
        },
        {
            id: 4,
            icon: service4,
            title: "Flats and Buildings",
            description: "Explore modern apartments and commercial spaces in prime locations."
        },
        {
            id: 5,
            icon: service5,
            title: "Shops and Malls",
            description: "Find ideal retail spaces and shopping destinations for your business."
        },
        {
            id: 6,
            icon: service6,
            title: "24/7 Service",
            description: "Round-the-clock support for all your real estate needs and queries."
        }
    ];

    return (
        <section className="services">
            <h1 className="heading">Our Services</h1>

            <div className="box-container">
                {services.map((service) => (
                    <div key={service.id} className="box">
                        <img src={service.icon} alt={service.title} />
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
