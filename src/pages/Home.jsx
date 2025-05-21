// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css';

// Import images from your folders
import dinnerImage from '../assets/images/venues/dinner.jpeg';
import exhibitionImage from '../assets/images/venues/exhibition.jpg';
import classroomImage from '../assets/images/venues/classroom.jpg';
import receptionImage from '../assets/images/venues/reception.jpg';
import theatreImage from '../assets/images/venues/Theatre.jpg';
import cabaretImage from '../assets/images/venues/cararet.jpeg';
import dinnerDanceImage from '../assets/images/venues/dinner-dance.jpg';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('Dinner');
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    // Add animation effect when category changes
    setIsAnimated(true);
    const timer = setTimeout(() => setIsAnimated(false), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory]);
  
  const categories = [
    'Dinner',
    'Exhibition',
    'Classroom',
    'Reception',
    'Theatre',
    'Cabaret',
    'Dinner & Dance'
  ];
  
  // Event venue details for each category
  const eventVenues = {
    'Dinner': {
      title: 'Howard Suite Dinner',
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
    'Exhibition': {
      title: 'Grand Exhibition Hall',
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
    'Classroom': {
      title: 'Learning Center',
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
    'Reception': {
      title: 'Atrium Reception Hall',
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
    'Theatre': {
      title: 'Premier Auditorium',
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
    'Cabaret': {
      title: 'Starlight Cabaret',
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
    'Dinner & Dance': {
      title: 'Celebration Ballroom',
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
  };
  
  // Get current venue based on selected category
  const currentVenue = eventVenues[selectedCategory];
  
  return (
    <div className="home-page">
      {/* Category Tabs */}
      <div className="category-tabs-container">
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
        
      {/* Venue Details */}
      <div className={`venue-details ${isAnimated ? 'fade-in' : ''}`}>
        {/* Hero Image */}
        <div className="hero-container">
          <img 
            src={currentVenue.imagePath}
            alt={currentVenue.title}
            className="hero-image"
          />
          <div className="hero-overlay">
            <h3 className="venue-title">{currentVenue.title}</h3>
            <div className="venue-badges">
              <span className="venue-badge">{currentVenue.capacity}</span>
              <span className="venue-badge">{currentVenue.view}</span>
            </div>
          </div>
        </div>
          
        {/* Content Area */}
        <div className="content-area">
          <p className="venue-description">{currentVenue.description}</p>
            
          <div className="book-container">
            <button className="book-button">
              CHECK AVAILABILITY
            </button>
          </div>
            
          {/* Details Section with Table */}
          <div className="details-section">
            <h4 className="details-title">THE DETAILS</h4>
            
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
                    <td>
                      <ul className="table-list">
                        {currentVenue.roomConditions.map((condition, index) => (
                          <li key={index} className="table-list-item">
                            <span className="table-icon">
                              {condition === 'Natural Daylight' ? '☀️' : 
                               condition === 'Air Conditioning' ? '❄️' : '•'}
                            </span>
                            <span>{condition.toUpperCase()}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="table-list">
                        {currentVenue.connectivity.map((item, index) => (
                          <li key={index} className="table-list-item">
                            <span className="table-icon">
                              {item === 'Portable' ? '🖥️' : 
                               item === 'Portable Projector' ? '📽️' :
                               item.includes('plasma') ? '📺' : '•'}
                            </span>
                            <span>{item.toUpperCase()}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <div className="dimensions-container">
                        <div className="dimensions-row">
                          <span className="dimensions-label">Length:</span>
                          <span className="dimensions-value">{currentVenue.dimensions.length}</span>
                        </div>
                        <div className="dimensions-row">
                          <span className="dimensions-label">Width:</span>
                          <span className="dimensions-value">{currentVenue.dimensions.width}</span>
                        </div>
                        <div className="dimensions-row">
                          <span className="dimensions-label">Height:</span>
                          <span className="dimensions-value">{currentVenue.dimensions.height}</span>
                        </div>
                        <div className="dimensions-row total-size">
                          <span className="dimensions-label">Total Size:</span>
                          <span className="dimensions-value size-highlight">{currentVenue.size}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button className="download-button">
                        <span className="download-icon">📥</span>
                        FLOOR PLAN DOWNLOAD
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;