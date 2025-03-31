import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <section className="flex">
        <div className="box">
          <h3>Contact Info</h3>
          <a href="tel:1234567890">
            <i className="fas fa-phone"></i>
            <span>123456789</span>
          </a>
          <a href="tel:1112223333">
            <i className="fas fa-phone"></i>
            <span>1112223333</span>
          </a>
          <a href="mailto:shaikhanas@gmail.com">
            <i className="fas fa-envelope"></i>
            <span>sharmavedant4513@gmail.com</span>
          </a>
          <a href="https://www.google.com/maps">
            <i className="fas fa-map-marker-alt"></i>
            <span>Nadiad, India - 387001</span>
          </a>
        </div>

        <div className="box">
          <h3>Quick Links</h3>
          <Link to="/"><span>Home</span></Link>
          <Link to="/about"><span>About</span></Link>
          <Link to="/contact"><span>Contact</span></Link>
          <Link to="/properties"><span>All Listings</span></Link>
          <Link to="/saved-properties"><span>Saved Properties</span></Link>
        </div>

        <div className="box">
          <h3>Follow Us</h3>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <span>Facebook</span>
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <span>Twitter</span>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <span>LinkedIn</span>
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <span>Instagram</span>
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </section>

      <div className="credit">
        &copy; {new Date().getFullYear()} by <span>Shivam and Vedant</span> | All rights reserved!
      </div>
    </footer>
  );
};

export default Footer;
