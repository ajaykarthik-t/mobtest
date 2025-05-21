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
      roomConditions: ['Natural Daylight', 'Air Conditioning', 'Premium Furnishings'],
      connectivity: ['High-speed Wi-Fi', 'Portable projector', '10 plasma screens'],
      dimensions: 'L 47.6m W 10.3m H 3.1m',
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
      dimensions: 'L 50.2m W 18.7m H 4.5m',
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
      dimensions: 'L 18.3m W 12.1m H 3.0m',
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
      dimensions: 'L 32.8m W 15.4m H 6.2m',
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
      dimensions: 'L 28.5m W 22.3m H 7.2m',
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
      dimensions: 'L 24.8m W 18.6m H 4.8m',
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
      dimensions: 'L 36.2m W 22.5m H 5.3m',
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
              BOOK NOW
            </button>
          </div>
            
          {/* Details Section */}
          <div className="details-section">
            <h4 className="details-title">The Details</h4>
              
            <div className="details-grid">
              {/* Room Conditions */}
              <div className="details-card">
                <h5 className="details-card-title">Room Conditions</h5>
                <ul className="details-list">
                  {currentVenue.roomConditions.map((condition, index) => (
                    <li key={index} className="details-list-item">
                      <span className="checkmark">✓</span>
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
                
              {/* Connectivity */}
              <div className="details-card">
                <h5 className="details-card-title">Connectivity</h5>
                <ul className="details-list">
                  {currentVenue.connectivity.map((item, index) => (
                    <li key={index} className="details-list-item">
                      <span className="bullet">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
                
              {/* Room Dimensions */}
              <div className="details-card">
                <h5 className="details-card-title">Room Dimensions</h5>
                <p>{currentVenue.dimensions}</p>
                <p className="size-info">Overall Size: {currentVenue.size}</p>
              </div>
                
              {/* Floor Plan */}
              <div className="details-card">
                <h5 className="details-card-title">Floor Plan</h5>
                <button className="download-button">
                  <span className="download-icon">↓</span>
                  Floor Plan Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;