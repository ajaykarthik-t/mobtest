// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css';
import CalendarModal from '../components/CalendarModal';

// Import images from your folders
import ledStudioImage from '../assets/images/venues/LedStudio.webp';
import dinnerImage from '../assets/images/venues/dinner.jpeg';
import floorplanImage from '../assets/images/floor-plans/floorplan.webp';
import floorplan2Image from '../assets/images/floor-plans/floorplan2.webp';

const Home = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [visibleSections, setVisibleSections] = useState(new Set());
  
  // Event venue details for each category
  const eventVenues = [
    {
      id: 'led-studio',
      title: 'LED STUDIO LOUNGE',
      category: 'Multi-Purpose',
      description: 'Whether you\'re planning a conference, awards ceremony, or wedding, our spacious suite can accommodate up to 350 guests. With stunning views of the historic Wakefield Trinity pitch, the LED Studio Lounge provides a unique and memorable setting that will make your event truly extraordinary.',
      subDescription: 'The LED Studio provides a professional and inviting atmosphere to make your occasion stand out.',
      capacity: [
        { type: 'Dinner', value: '250' },
        { type: 'Dinner/Dance', value: '210' },
        { type: 'Reception', value: '350' },
        { type: 'Theatre', value: '300' },
        { type: 'Cabaret', value: '200' },
        { type: 'Boardroom', value: '64' },
        { type: 'U-shape', value: '70' }
      ],
      features: [
        'Accessible',
        'Natural daylight',
        'Air-conditioning',
        'Pitch view',
        'Stadium access',
        'Stage',
        'PA system',
        '2 microphones',
        'LED Screens',
        'Free WIFI',
        'Fixed bar',
        '160 parking spaces'
      ],
      dimensions: [
        { type: 'Length', value: '27m' },
        { type: 'Width', value: '11.7x17.4m' },
        { type: 'Height', value: '4.5m' }
      ],
      size: '315m²',
      floorplanImage: floorplanImage,
      imagePath: ledStudioImage
    },
    {
      id: 'dinner',
      title: 'HOWARD SUITE DINNER',
      category: 'Dinner',
      description: 'Wow guests at your next dinner, charity function or black tie event with the Howard Suite Dinner. The only suite in the world to overlook two international stadia, with uninterrupted views from towering windows.',
      subDescription: 'The Howard Suite provides a professional and inviting atmosphere to make your occasion stand out.',
      capacity: [
        { type: 'Reception', value: '90' },
        { type: 'Theatre', value: '80' },
        { type: 'Cabaret', value: '32' },
        { type: 'Boardroom', value: '22' },
        { type: 'U-shape', value: '30' }
      ],
      features: [
        'Accessible',
        'Natural daylight',
        'Air-conditioning',
        '2 touch enabled',
        'LED screens',
        'Free WIFI',
        '160 parking spaces'
      ],
      dimensions: [
        { type: 'Length', value: '17.5m' },
        { type: 'Width', value: '7.6m' },
        { type: 'Height', value: '3m' }
      ],
      size: '91m²',
      floorplanImage: floorplan2Image,
      imagePath: dinnerImage
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.venue-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleCheckAvailability = (venueName) => {
    setSelectedVenue(venueName);
    setIsCalendarOpen(true);
  };

  const handleDiningPackages = () => {
    console.log('Dining Packages clicked');
  };

  const handleEnquireNow = () => {
    console.log('Enquire Now clicked');
  };

  return (
    <div className="home-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Our Event Venues</h1>
          <p className="page-subtitle">Discover the perfect space for your next event</p>
        </div>
      </div>

      {/* Venues Container */}
      <div className="venues-container">
        {eventVenues.map((venue, index) => (
          <section 
            key={venue.id} 
            id={venue.id}
            className={`venue-section ${visibleSections.has(venue.id) ? 'visible' : ''}`}
          >
            <div className="venue-content">
              {/* Left Content Section */}
              <div className="content-section">
                <div className="venue-header">
                  <h1 className="venue-title">{venue.title}</h1>
                  <div className="action-buttons">
                    <button className="action-btn dining-btn" onClick={handleDiningPackages}>
                      Dining Packages
                    </button>
                  </div>
                </div>

                <div className="venue-description">
                  <p className="main-description">{venue.description}</p>
                  <p className="sub-description">{venue.subDescription}</p>
                </div>

                <div className="details-grid">
                  {/* Capacity Section */}
                  <div className="detail-section">
                    <h3 className="section-title">CAPACITY</h3>
                    <div className="capacity-list">
                      {venue.capacity.map((item, index) => (
                        <div key={index} className="capacity-item">
                          <span className="capacity-type">{item.type}</span>
                          <span className="capacity-value">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="detail-section">
                    <h3 className="section-title">FEATURES</h3>
                    <div className="features-grid">
                      {venue.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dimensions Section */}
                  <div className="detail-section">
                    <h3 className="section-title">DIMENSIONS</h3>
                    <div className="dimensions-list">
                      {venue.dimensions.map((dimension, index) => (
                        <div key={index} className="dimension-item">
                          <span className="dimension-type">{dimension.type}</span>
                          <span className="dimension-value">{dimension.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floor Plan Diagram */}
                <div className="floor-plan-section">
                  <div className="floor-plan-diagram">
                    <div className="plan-shape">
                      <span className="plan-size">{venue.size}</span>
                    </div>
                  </div>
                  {/* Floor Plan Image */}
                  <div className="floorplan-compact">
                    <div className="floorplan-image-small">
                      <img 
                        src={venue.floorplanImage} 
                        alt={`${venue.title} Floor Plan`} 
                        className="floorplan-image"
                        onError={(e) => {
                          console.error(`Failed to load floorplan image: ${venue.floorplanImage}`);
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="floorplan-info">
                      <h4 className="chairmans-title">CHAIRMAN'S LOUNGE</h4>
                      <p className="chairmans-subtitle">Dining Packages · Enquire Now</p>
                      <button className="download-button-small">
                        <span className="download-icon">📥</span>
                        FLOOR PLAN
                      </button>
                    </div>
                  </div>
                </div>

                {/* Check Availability Button */}
                <div className="book-container">
                  <button 
                    className="book-button"
                    onClick={() => handleCheckAvailability(venue.title)}
                  >
                    CHECK AVAILABILITY
                  </button>
                </div>
              </div>

              {/* Right Image Section */}
              <div className="image-section">
                <div className="venue-image-container">
                  <img 
                    src={venue.imagePath}
                    alt={venue.title}
                    className="venue-image"
                    onError={(e) => {
                      console.error(`Failed to load image: ${venue.imagePath}`);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      
      <CalendarModal 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)}
        venueName={selectedVenue}
      />
    </div>
  );
};

export default Home;