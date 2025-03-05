import React from "react";
import "../styles/Listing.css";
import img1 from "../assets/images/house-img-1.webp";
import img2 from "../assets/images/house-img-2.webp";
import img3 from "../assets/images/house-img-3.jpg";

const Listings = () => {
  const properties = [
    {
      img: img1,
      type: ["house", "sale"],
      admin: "J",
      name: "John Wick",
      date: "10-9-2023",
      title: "Modern Flats and Apartments",
      location: "Andheri, Mumbai, India - 401303",
      beds: 3,
      baths: 2,
      area: "750 sqft",
      link: "view_property.html",
    },
    {
      img: img2,
      type: ["flat", "sale"],
      admin: "J",
      name: "Ahir Vyas",
      date: "10-4-2024",
      title: "Modern Flats and Apartments",
      location: "Andheri, Mumbai, India - 401303",
      beds: 3,
      baths: 2,
      area: "750 sqft",
      link: "view_property.html",
    },
    {
      img: img3,
      type: ["flat", "sale"],
      admin: "J",
      name: "Krutika singh",
      date: "10-11-2022",
      title: "Modern Flats and Apartments",
      location: "Andheri, Mumbai, India - 401303",
      beds: 3,
      baths: 2,
      area: "750 sqft",
      link: "view_property.html",
    },
  ];

  return (
      <section className="listings">
        <h1 className="heading">Latest Listings</h1>

        <div className="box-container">
          {properties.map((property, index) => (
              <div className="box" key={index}>
                <div className="admin">
                  <h3>{property.admin}</h3>
                  <div>
                    <p>{property.name}</p>
                    <span>{property.date}</span>
                  </div>
                </div>
                <div className="thumb">
                  <p className="total-images">
                    <i className="far fa-image"></i>
                    <span>4</span>
                  </p>
                  <p className="type">
                    {property.type.map((t, i) => (
                        <span key={i}>{t}</span>
                    ))}
                  </p>
                  <form action="" method="post" className="save">
                    <button type="submit" name="save" className="far fa-heart"></button>
                  </form>
                  <img src={property.img} alt={property.title} />
                </div>
                <h3 className="name">{property.title}</h3>
                <p className="location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{property.location}</span>
                </p>
                <div className="flex">
                  <p>
                    <i className="fas fa-bed"></i>
                    <span>{property.beds}</span>
                  </p>
                  <p>
                    <i className="fas fa-bath"></i>
                    <span>{property.baths}</span>
                  </p>
                  <p>
                    <i className="fas fa-maximize"></i>
                    <span>{property.area}</span>
                  </p>
                </div>
                <a href={property.link} className="btn">
                  View Property
                </a>
              </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <a href="listings.html" className="inline-btn">
            View All
          </a>
        </div>
      </section>
  );
};

export default Listings;
