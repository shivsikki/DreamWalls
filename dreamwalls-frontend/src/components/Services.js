import React from "react";
import "../styles/Services.css";
import icon1 from "../assets/images/icon-1.png";
import icon2 from "../assets/images/icon-2.png";
import icon3 from "../assets/images/icon-3.png";
import icon4 from "../assets/images/icon-4.png";
import icon5 from "../assets/images/icon-5.png";
import icon6 from "../assets/images/icon-6.png";

const Services = () => {
    const servicesData = [
        { img: icon1, title: "Buy House" },
        { img: icon2, title: "Rent House" },
        { img: icon3, title: "Sell House" },
        { img: icon4, title: "Flats and Buildings" },
        { img: icon5, title: "Shops and Malls" },
        { img: icon6, title: "24/7 Service" },
    ];

    return (
        <section className="services">
            <h1 className="heading">Our Services</h1>

            <div className="box-container">
                {servicesData.map((service, index) => (
                    <div className="box" key={index}>
                        <img src={service.img} alt={service.title} />
                        <h3>{service.title}</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Doloremque, incidunt.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
