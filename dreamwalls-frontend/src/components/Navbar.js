import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handlePropertyFilter = (filterType, value) => {
    if (filterType === 'buy') {
      switch (value) {
        case 'house':
          navigate('/properties?type=house');
          break;
        case 'flat':
          navigate('/properties?type=flat');
          break;
        case 'ready':
          navigate('/properties?status=available&furnished=full');
          break;
        case 'furnished':
          navigate('/properties?furnished=semi,fully,full');
          break;
        default:
          navigate('/properties');
      }
    } else if (filterType === 'rent') {
      switch (value) {
        case 'house':
          navigate('/rent?type=house');
          break;
        case 'flat':
          navigate('/rent?type=flat');
          break;
        default:
          navigate('/rent');
      }
    }
  };

  return (
    <header className="header">
      {/* Top Navigation */}
      <nav className="navbar nav-1">
        <section className="flex">
          <Link to="/" className="logo">
            <i className="fas fa-home"></i> Dream Walls
          </Link>

          <ul>
            <li>
              <Link to="/compare">
                Compare Properties <i className="fas fa-exchange-alt"></i>
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
                <Link to="/properties">Buy <i className="fas fa-angle-down"></i></Link>
                <ul>
                  <li>
                    <button 
                      onClick={() => handlePropertyFilter('buy', 'house')}
                      className="nav-button"
                    >
                      House
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handlePropertyFilter('buy', 'flat')}
                      className="nav-button"
                    >
                      Flat
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handlePropertyFilter('buy', 'ready')}
                      className="nav-button"
                    >
                      Ready to Move
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handlePropertyFilter('buy', 'furnished')}
                      className="nav-button"
                    >
                      Furnished
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/sell">Sell <i className="fas fa-angle-down"></i></Link>
                <ul>
                  <li><Link to="/sell">Post Property</Link></li>
                </ul>
              </li>
              <li>
                <Link to="/rent">Rent <i className="fas fa-angle-down"></i></Link>
                <ul>
                  <li>
                    <button 
                      onClick={() => handlePropertyFilter('rent', 'house')}
                      className="nav-button"
                    >
                      House
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handlePropertyFilter('rent', 'flat')}
                      className="nav-button"
                    >
                      Flat
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/about">Help <i className="fas fa-angle-down"></i></Link>
                <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                </ul>
              </li>
            </ul>
          </div>

          <ul className="user-menu">
            <li>
              <Link to="/saved-properties">
                Saved <i className="far fa-heart"></i>
              </Link>
            </li>
            <li>
              <Link to="/account">
                Account <i className="fas fa-angle-down"></i>
              </Link>
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
