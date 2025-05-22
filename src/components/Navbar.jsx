// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      {/* Top section - White/Light background */}
      <div className="navbar-top">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            {/* You can add your logo here */}
            {/* <span className="logo-placeholder">🏆</span> */}
          </div>
          <span className="brand-text">React Demo App</span>
        </Link>
        <div className="navbar-actions">
          {/* Additional actions like search, user menu, etc. */}
          <button className="navbar-action-btn"></button>
          <button className="navbar-action-btn">☰</button>
        </div>
      </div>
      
      {/* Bottom section - Red background */}
      <div className="navbar-bottom">
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            HOME
          </Link>
          <Link 
            to="/about" 
            className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            ABOUT
          </Link>
          <Link 
            to="/services" 
            className={`navbar-link ${location.pathname === '/services' ? 'active' : ''}`}
          >
            SERVICES
          </Link>
          <Link 
            to="/contact" 
            className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            CONTACT
          </Link>
          <Link 
            to="/events" 
            className={`navbar-link ${location.pathname === '/events' ? 'active' : ''}`}
          >
            EVENTS
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;