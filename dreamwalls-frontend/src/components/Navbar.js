import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";


const Navbar = () => {
  return (
    <header className="header">
      {/* Top Navigation */}
      <nav className="navbar nav-1">
        <section className="flex">
          <Link to="/" className="logo">
            <i className="fas fa-house"></i> DreamWalls
          </Link>

          <ul>
            <li>
              <Link to="/post-property">
                Post Property <i className="fas fa-paper-plane"></i>
              </Link>
            </li>
          </ul>
        </section>
      </nav>

      {/* Main Navigation */}
      <nav className="navbar nav-2">
        <section className="flex">
          <div id="menu-btn" className="fas fa-bars"></div>

          <div className="menu">
            <ul>
              <li>
                <a href="#">Buy <i className="fas fa-angle-down"></i></a>
                <ul>
                  <li><a href="#">House</a></li>
                  <li><a href="#">Flat</a></li>
                  <li><a href="#">Shop</a></li>
                  <li><a href="#">Ready to Move</a></li>
                  <li><a href="#">Furnished</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Sell <i className="fas fa-angle-down"></i></a>
                <ul>
                  <li><a href="#">Post Property</a></li>
                  <li><a href="#">Dashboard</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Rent <i className="fas fa-angle-down"></i></a>
                <ul>
                  <li><a href="#">House</a></li>
                  <li><a href="#">Flat</a></li>
                  <li><a href="#">Shop</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Help <i className="fas fa-angle-down"></i></a>
                <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/contact#faq">FAQ</Link></li>
                </ul>
              </li>
            </ul>
          </div>

          <ul>
            <li>
              <a href="#">Saved <i className="far fa-heart"></i></a>
            </li>
            <li>
              <a href="#">Account <i className="fas fa-angle-down"></i></a>
              <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </li>
          </ul>
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
