// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css';
import CalendarModal from '../components/CalendarModal'; // Fixed typo: CalandarModal -> CalendarModal

// Import images from your folders
import ledStudioImage from '../assets/images/venues/LedStudio.webp';
import dinnerImage from '../assets/images/venues/dinner.jpeg';
import floorplanImage from '../assets/images/floor-plans/floorplan.webp';

const Home = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [visibleSections, setVisibleSections] = useState(new Set());
  
  // Event venue details for each category
  const eventVenues = [
    {
      id: 'led-studio',
      title: 'LED Studio Lounge',
      category: 'Multi-Purpose',
      description: 'Whether you\'re planning a conference, awards ceremony, or wedding, our spacious suite can accommodate up to 350 guests. With stunning views of the historic Wakefield Trinity pitch, the LED Studio Lounge provides a unique and memorable setting that will make your event truly extraordinary.',
      capacity: {
        dinner: 250,
        dinnerDance: 210,
        reception: 350,
        theatre: 300,
        cabaret: 200,
        boardroom: 64,
        uShape: 70
      },
      // Fixed: Added capacity display property for consistency
      capacityDisplay: '350 capacity',
      view: 'Pitch view',
      roomConditions: ['Accessible', 'Natural Daylight', 'Air Conditioning', 'Stadium Access'],
      connectivity: ['Free WIFI', 'PA System', '2 Microphones', 'LED Screens', 'Fixed Bar', 'Stage'],
      dimensions: {
        length: '27m',
        width: '11.7x17.4m',
        height: '4.5m'
      },
      size: '315m²',
      additionalFeatures: ['160 Parking Spaces'],
      imagePath: ledStudioImage
    },
    {
      id: 'dinner',
      title: 'Howard Suite Dinner',
      category: 'Dinner',
      description: 'Wow guests at your next dinner, charity function or black tie event with the Howard Suite Dinner. The only suite in the world to overlook two international stadia, with uninterrupted views from towering windows. With award-winning catering and space to accommodate up to 450 guests, your dinner will be one to remember.',
      capacityDisplay: '450 capacity', // Fixed: Changed from capacity to capacityDisplay for consistency
      view: 'View of both stadia',
      roomConditions: ['Natural Daylight', 'Air Conditioning'],
      connectivity: ['Portable', 'Portable Projector', '10 plasma screens'],
      dimensions: {
        length: '47.6m',
        width: '10.3m',
        height: '3.1m'
      },
      size: '471m²',
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

  const getIconForCondition = (condition) => {
    if (condition === 'Natural Daylight') return '☀️';
    if (condition === 'Air Conditioning') return '❄️';
    if (condition === 'Climate Control') return '🌡️';
    if (condition === 'Configurable Lighting' || condition === 'Professional Lighting' || condition === 'Adjustable Lighting' || condition === 'Dimmable Lighting') return '💡';
    if (condition === 'Acoustic Panels' || condition === 'Acoustic Design' || condition === 'Sound Insulation') return '🔊';
    if (condition === 'Dance Floor') return '💃';
    if (condition === 'Ambient Lighting') return '✨';
    if (condition === 'Accessible') return '♿';
    if (condition === 'Stadium Access') return '🏟️';
    return '•';
  };

  const getIconForConnectivity = (item) => {
    if (item === 'Portable' || item.includes('Interactive whiteboard')) return '🖥️';
    if (item === 'Portable Projector' || item.includes('Projection')) return '📽️';
    if (item.includes('plasma') || item.includes('monitors') || item.includes('screens')) return '📺';
    if (item.includes('Wi-Fi') || item.includes('WIFI')) return '📶';
    if (item.includes('Sound') || item.includes('DJ') || item.includes('PA System')) return '🎵';
    if (item.includes('Video conferencing')) return '📹';
    if (item.includes('Recording')) return '🎙️';
    if (item.includes('Light show') || item.includes('LED Screens')) return '🎆';
    if (item.includes('Microphones')) return '🎤';
    if (item.includes('Bar')) return '🍸';
    if (item.includes('Stage')) return '🎭';
    return '•';
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

      {/* Venue Sections */}
      <div className="venues-container">
        {eventVenues.map((venue, index) => (
          <section 
            key={venue.id} 
            id={venue.id}
            className={`venue-section ${visibleSections.has(venue.id) ? 'visible' : ''}`}
          >
            {/* Hero Image */}
            <div className="hero-container">
              <img 
                src={venue.imagePath}
                alt={venue.title}
                className="hero-image"
                onError={(e) => {
                  console.error(`Failed to load image: ${venue.imagePath}`);
                  e.target.style.display = 'none';
                }}
              />
              <div className="hero-overlay">
                <div className="category-badge">{venue.category}</div>
                <h2 className="venue-title">{venue.title}</h2>
                <div className="venue-badges">
                  <span className="venue-badge">{venue.capacityDisplay}</span>
                  <span className="venue-badge">{venue.view}</span>
                </div>
              </div>
            </div>
              
            {/* Content Area */}
            <div className="content-area">
              <p className="venue-description">{venue.description}</p>
                
              <div className="book-container">
                <button 
                  className="book-button"
                  onClick={() => handleCheckAvailability(venue.title)}
                >
                  CHECK AVAILABILITY
                </button>
              </div>
                
              {/* Details Section with Table */}
              <div className="details-section">
                <h3 className="details-title">THE DETAILS</h3>
                
                <div className="details-table-container">
                  <table className="details-table">
                    <thead>
                      <tr>
                        <th>ROOM CONDITIONS</th>
                        <th>CONNECTIVITY</th>
                        <th>ROOM DIMENSIONS</th>
                        <th>FLOOR PLAN</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-label="ROOM CONDITIONS">
                          <ul className="table-list">
                            {venue.roomConditions && venue.roomConditions.map((condition, index) => (
                              <li key={index} className="table-list-item">
                                <span className="table-icon">
                                  {getIconForCondition(condition)}
                                </span>
                                <span>{condition.toUpperCase()}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td data-label="CONNECTIVITY">
                          <ul className="table-list">
                            {venue.connectivity && venue.connectivity.map((item, index) => (
                              <li key={index} className="table-list-item">
                                <span className="table-icon">
                                  {getIconForConnectivity(item)}
                                </span>
                                <span>{item.toUpperCase()}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td data-label="ROOM DIMENSIONS">
                          <div className="dimensions-container">
                            <div className="dimensions-row">
                              <span className="dimensions-label">Length:</span>
                              <span className="dimensions-value">{venue.dimensions.length}</span>
                            </div>
                            <div className="dimensions-row">
                              <span className="dimensions-label">Width:</span>
                              <span className="dimensions-value">{venue.dimensions.width}</span>
                            </div>
                            <div className="dimensions-row">
                              <span className="dimensions-label">Height:</span>
                              <span className="dimensions-value">{venue.dimensions.height}</span>
                            </div>
                            <div className="dimensions-row total-size">
                              <span className="dimensions-label">Total Size:</span>
                              <span className="dimensions-value size-highlight">{venue.size}</span>
                            </div>
                          </div>
                        </td>
                        <td data-label="FLOOR PLAN" className="floorplan-cell">
                          <div className="floorplan-content">
                            <div className="floorplan-image-container">
                              <img 
                                src={floorplanImage} 
                                alt="Chairman's Lounge Floor Plan" 
                                className="floorplan-image"
                                onError={(e) => {
                                  console.error(`Failed to load floorplan image: ${floorplanImage}`);
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                            
                            <div className="floorplan-details">
                              <h4 className="chairmans-title">CHAIRMAN'S LOUNGE</h4>
                              <p className="chairmans-subtitle">Dining Packages · Enquire Now</p>
                              
                              <p className="chairmans-description">
                                An intimate and versatile event space perfect for your next special event. The Chairman's Lounge offers the perfect blend of elegance and functionality.
                              </p>
                              
                              <button className="download-button">
                                <span className="download-icon">📥</span>
                                FLOOR PLAN DOWNLOAD
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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