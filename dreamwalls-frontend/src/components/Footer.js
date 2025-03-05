  import React from "react";
  import "../styles/Footer.css"

  const Footer = () => {
    return (
      <footer className="footer">
        <section className="flex">
          <div className="box">
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
              <span>shaikhanas@gmail.com</span>
            </a>
            <a href="#">
              <i className="fas fa-map-marker-alt"></i>
              <span>Mumbai, India - 400104</span>
            </a>
          </div>

          <div className="box">
            <a href="home.html"><span>Home</span></a>
            <a href="about.html"><span>About</span></a>
            <a href="contact.html"><span>Contact</span></a>
            <a href="listings.html"><span>All Listings</span></a>
            <a href="#"><span>Saved Properties</span></a>
          </div>

          <div className="box">
            <a href="#">
              <span>Facebook</span>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <span>Twitter</span>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <span>LinkedIn</span>
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#">
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
