// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css';
import CalendarModal from '../components/CalandarModal';

// Import images from your folders
import dinnerImage from '../assets/images/venues/dinner.jpeg';
import exhibitionImage from '../assets/images/venues/exhibition.jpg';
import classroomImage from '../assets/images/venues/classroom.jpg';
import receptionImage from '../assets/images/venues/reception.jpg';
import theatreImage from '../assets/images/venues/Theatre.jpg';
import cabaretImage from '../assets/images/venues/cararet.jpeg';
import dinnerDanceImage from '../assets/images/venues/dinner-dance.jpg';
import floorplanImage from '../assets/images/floor-plans/floorplan.webp';

const Home = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [visibleSections, setVisibleSections] = useState(new Set());
  
  // Event venue details for each category
  const eventVenues = [
    {
      id: 'dinner',
      title: 'Howard Suite Dinner',
      category: 'Dinner',
      description: 'Wow guests at your next dinner, charity function or black tie event with the Howard Suite Dinner. The only suite in the world to overlook two international stadia, with uninterrupted views from towering windows. With award-winning catering and space to accommodate up to 450 guests, your dinner will be one to remember.',
      capacity: '450 capacity',
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
    },
    {
      id: 'exhibition',
      title: 'Grand Exhibition Hall',
      category: 'Exhibition',
      description: 'Our spacious Exhibition Hall provides the perfect backdrop for showcasing art, products, or industry exhibitions. With flexible floor space and excellent lighting, your exhibition will captivate visitors and create lasting impressions.',
      capacity: '600 capacity',
      view: 'Garden view',
      roomConditions: ['Natural Daylight', 'Air Conditioning', 'Configurable Lighting'],
      connectivity: ['Wi-Fi', 'Digital displays', '8 plasma screens'],
      dimensions: {
        length: '50.2m',
        width: '18.7m',
        height: '4.5m'
      },
      size: '938m²',
      imagePath: exhibitionImage
    },
    {
      id: 'classroom',
      title: 'Learning Center',
      category: 'Classroom',
      description: 'Our professional Learning Center offers the ideal environment for training sessions, workshops, and educational events. With a classroom-style setup, modern technology, and comfortable seating, attendees can focus on learning in this purpose-built space.',
      capacity: '120 capacity',
      view: 'City skyline',
      roomConditions: ['Natural Daylight', 'Air Conditioning', 'Acoustic Panels'],
      connectivity: ['Interactive whiteboard', 'Video conferencing', '6 monitors'],
      dimensions: {
        length: '18.3m',
        width: '12.1m',
        height: '3.0m'
      },
      size: '221m²',
      imagePath: classroomImage
    },
    {
      id: 'reception',
      title: 'Atrium Reception Hall',
      category: 'Reception',
      description: 'Make a stunning first impression with our Atrium Reception Hall. Perfect for welcome events, networking, and cocktail receptions. The grand architecture and elegant atmosphere set the stage for meaningful connections and memorable interactions.',
      capacity: '350 capacity',
      view: 'Atrium view',
      roomConditions: ['Natural Daylight', 'Climate Control', 'Ambient Lighting'],
      connectivity: ['Sound system', 'Wireless presentations', '4 digital signage screens'],
      dimensions: {
        length: '32.8m',
        width: '15.4m',
        height: '6.2m'
      },
      size: '505m²',
      imagePath: receptionImage
    },
    {
      id: 'theatre',
      title: 'Premier Auditorium',
      category: 'Theatre',
      description: 'Our state-of-the-art auditorium provides the perfect setting for presentations, performances, and lectures. With tiered seating, excellent acoustics, and professional lighting, your audience will enjoy an immersive experience from every seat.',
      capacity: '280 capacity',
      view: 'Internal',
      roomConditions: ['Professional Lighting', 'Climate Control', 'Acoustic Design'],
      connectivity: ['Professional AV system', 'Recording capability', 'Stage monitors'],
      dimensions: {
        length: '28.5m',
        width: '22.3m',
        height: '7.2m'
      },
      size: '635m²',
      imagePath: theatreImage
    },
    {
      id: 'cabaret',
      title: 'Starlight Cabaret',
      category: 'Cabaret',
      description: 'Experience the magic of our Starlight Cabaret venue. Designed for entertainment events with a touch of glamour, this versatile space can host performances, themed parties, and sophisticated gatherings where style meets substance.',
      capacity: '200 capacity',
      view: 'Night skyline',
      roomConditions: ['Adjustable Lighting', 'Climate Control', 'Sound Insulation'],
      connectivity: ['Performance sound system', 'Stage lighting', 'Projection capabilities'],
      dimensions: {
        length: '24.8m',
        width: '18.6m',
        height: '4.8m'
      },
      size: '461m²',
      imagePath: cabaretImage
    },
    {
      id: 'dinner-dance',
      title: 'Celebration Ballroom',
      category: 'Dinner & Dance',
      description: 'Our elegant Celebration Ballroom is the perfect venue for your dinner and dance event. With a spacious dance floor, sophisticated dining area, and state-of-the-art audio-visual facilities, your guests will enjoy an unforgettable evening of dining and dancing.',
      capacity: '320 capacity',
      view: 'Garden terrace',
      roomConditions: ['Dimmable Lighting', 'Climate Control', 'Dance Floor'],
      connectivity: ['DJ booth', 'Light show capabilities', 'Premium sound system'],
      dimensions: {
        length: '36.2m',
        width: '22.5m',
        height: '5.3m'
      },
      size: '815m²',
      imagePath: dinnerDanceImage
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
    return '•';
  };

  const getIconForConnectivity = (item) => {
    if (item === 'Portable' || item.includes('Interactive whiteboard')) return '🖥️';
    if (item === 'Portable Projector' || item.includes('Projection')) return '📽️';
    if (item.includes('plasma') || item.includes('monitors') || item.includes('screens')) return '📺';
    if (item.includes('Wi-Fi')) return '📶';
    if (item.includes('Sound') || item.includes('DJ')) return '🎵';
    if (item.includes('Video conferencing')) return '📹';
    if (item.includes('Recording')) return '🎙️';
    if (item.includes('Light show')) return '🎆';
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
              />
              <div className="hero-overlay">
                <div className="category-badge">{venue.category}</div>
                <h2 className="venue-title">{venue.title}</h2>
                <div className="venue-badges">
                  <span className="venue-badge">{venue.capacity}</span>
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
                            {venue.roomConditions.map((condition, index) => (
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
                            {venue.connectivity.map((item, index) => (
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