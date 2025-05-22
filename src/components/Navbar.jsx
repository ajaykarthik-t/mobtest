import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/icons/logo.webp';
import './Navbar.css'; 

const Navbar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
      {/* Top section */}
      <div className="navbar-top">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
        </Link>
        <div className="navbar-actions">
          <button className="navbar-action-btn" aria-label="Open menu">☰</button>
        </div>
      </div>

      {/* Bottom section */}
      <div className="navbar-bottom">
        <div className="navbar-links">
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>HOME</Link>
          <Link to="/partner-offers" className={`navbar-link ${location.pathname === '/partner-offers' ? 'active' : ''}`}>Partner Offers</Link>
          <Link to="/commercial" className={`navbar-link ${location.pathname === '/commercial' ? 'active' : ''}`}>Commercial</Link>
          <Link to="/shop" className={`navbar-link ${location.pathname === '/shop' ? 'active' : ''}`}>Shop</Link>
          <Link to="/tickets" className={`navbar-link ${location.pathname === '/tickets' ? 'active' : ''}`}>Tickets</Link>
          <Link to="/match-hospitality" className={`navbar-link ${location.pathname === '/match-hospitality' ? 'active' : ''}`}>Match Hospitality</Link>
          <Link to="/events" className={`navbar-link ${location.pathname === '/events' ? 'active' : ''}`}>Events</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
