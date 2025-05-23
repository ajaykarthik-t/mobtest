// src/pages/AddOns.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddOns.css';

// Import meeting room SVGs
import meetingRoom1 from '../assets/meetingroom-vectors/meetingroom1.svg';
import meetingRoom2 from '../assets/meetingroom-vectors/meetingroom2.svg';
import meetingRoom3 from '../assets/meetingroom-vectors/meetingroom3.svg';
import meetingRoom4 from '../assets/meetingroom-vectors/meetingroom4.svg';
import meetingRoom5 from '../assets/meetingroom-vectors/meetingroom5.svg';

const AddOns = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get booking data from navigation state
  const bookingData = location.state || {};
  const {
    venueName = '',
    selectedDate = null,
    startTime = '',
    endTime = '',
    duration = 0,
    basePrice = 0
  } = bookingData;

  const [guestCount, setGuestCount] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [expandedSection, setExpandedSection] = useState('equipment');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState(null);
  
  // Meeting room arrangement state
  const [selectedRoomArrangement, setSelectedRoomArrangement] = useState(null);

  // Room arrangements data
  const roomArrangements = [
    { id: 1, name: 'Default Style', image: meetingRoom1 },
    { id: 2, name: 'Theater Style', image: meetingRoom2 },
    { id: 3, name: 'Boardroom Style', image: meetingRoom3 },
    { id: 4, name: 'Banquet Style', image: meetingRoom4 },
    { id: 5, name: 'U-Shape Style', image: meetingRoom5 },
  ];
  
  // New states for time picker
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [tempStartTime, setTempStartTime] = useState('');
  const [tempEndTime, setTempEndTime] = useState('');
  const [currentStartTime, setCurrentStartTime] = useState(startTime);
  const [currentEndTime, setCurrentEndTime] = useState(endTime);
  const [currentDuration, setCurrentDuration] = useState(duration);
  
  // Available add-ons with pricing (including catering)
  const addOnsData = {
    equipment: {
      title: "Audio Visual Equipment",
      items: [
        { id: 'projector', name: 'HD Projector', price: 75, description: 'High-definition projector with screen', icon: '📽️' },
        { id: 'sound_system', name: 'Sound System', price: 100, description: 'Professional audio system with microphones', icon: '🔊' },
        { id: 'lighting', name: 'Professional Lighting', price: 150, description: 'Stage and ambient lighting setup', icon: '💡' },
        { id: 'screens', name: 'Additional Screens', price: 50, description: 'Extra plasma screens for presentations', icon: '📺' },
        { id: 'microphones', name: 'Wireless Microphones', price: 30, description: 'Set of 4 wireless microphones', icon: '🎤' }
      ]
    },
    furniture: {
      title: "Furniture & Setup",
      items: [
        { id: 'chairs_standard', name: 'Standard Chairs', price: 5, description: 'Per chair - comfortable standard seating', perUnit: true, icon: '🪑' },
        { id: 'chairs_premium', name: 'Premium Chairs', price: 8, description: 'Per chair - luxury upholstered seating', perUnit: true, icon: '🛋️' },
        { id: 'tables_round', name: 'Round Tables', price: 25, description: 'Per table - seats 8-10 people', perUnit: true, icon: '⭕' },
        { id: 'tables_rectangular', name: 'Rectangular Tables', price: 20, description: 'Per table - seats 6-8 people', perUnit: true, icon: '▭' },
        { id: 'whiteboard', name: 'Whiteboards', price: 35, description: 'Mobile whiteboards with markers', icon: '📋' },
        { id: 'podium', name: 'Speaker Podium', price: 40, description: 'Professional speaking podium', icon: '🗣️' }
      ]
    },
    services: {
      title: "Additional Services",
      items: [
        { id: 'tech_support', name: 'Technical Support', price: 200, description: 'On-site technical assistance throughout event', icon: '🛠️' },
        { id: 'event_coordinator', name: 'Event Coordinator', price: 300, description: 'Dedicated event coordinator', icon: '👨‍💼' },
        { id: 'security', name: 'Security Service', price: 150, description: 'Professional security personnel', icon: '🛡️' },
        { id: 'photography', name: 'Event Photography', price: 400, description: 'Professional photographer for 4 hours', icon: '📸' },
        { id: 'cleaning', name: 'Post-Event Cleaning', price: 100, description: 'Complete venue cleaning service', icon: '🧹' }
      ]
    },
    catering: {
      title: "Catering Packages",
      items: [
        { id: 'breakfast', name: 'Continental Breakfast', price: 18, description: 'Fresh pastries, fruits, coffee, tea, and juice', perPerson: true, icon: '🥐' },
        { id: 'lunch', name: 'Business Lunch', price: 35, description: 'Three-course business lunch with beverages', perPerson: true, icon: '🍽️' },
        { id: 'dinner', name: 'Gala Dinner', price: 65, description: 'Elegant four-course dinner with wine service', perPerson: true, icon: '🍷' },
        { id: 'cocktail', name: 'Cocktail Reception', price: 28, description: 'Elegant cocktail reception with canapés', perPerson: true, icon: '🍸' }
      ]
    }
  };

  // Handle guest count input change
  const handleGuestCountChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      return; // Allow empty during typing
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1) {
      setGuestCount(numValue);
    }
  };

  // Handle guest count input blur (when user finishes typing)
  const handleGuestCountBlur = (e) => {
    const value = e.target.value;
    if (value === '' || parseInt(value) < 1) {
      setGuestCount(1); // Reset to 1 if empty or invalid
    }
  };

  // Handle quantity input change
  const handleQuantityInputChange = (categoryId, itemId, value) => {
    if (value === '') {
      // Allow empty during typing
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      handleQuantityChange(categoryId, itemId, numValue);
    }
  };

  // Handle quantity input blur
  const handleQuantityInputBlur = (categoryId, itemId, e) => {
    const value = e.target.value;
    if (value === '' || parseInt(value) < 0) {
      handleQuantityChange(categoryId, itemId, 0); // Reset to 0 if empty or invalid
    }
  };

  // Handle room arrangement selection
  const handleRoomArrangementSelect = (arrangementId) => {
    setSelectedRoomArrangement(arrangementId);
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = convertTo12Hour(timeString);
        slots.push({ value: timeString, display: displayTime });
      }
    }
    return slots;
  };

  // Convert 24-hour to 12-hour format
  const convertTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Calculate duration between two times
  const calculateDuration = (start, end) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    return durationMinutes / 60; // Return in hours
  };

  // Initialize temp times when modal opens
  const handleOpenTimeModal = () => {
    setTempStartTime(currentStartTime);
    setTempEndTime(currentEndTime);
    setShowTimeModal(true);
  };

  // Handle time change confirmation
  const handleTimeChange = () => {
    if (tempStartTime && tempEndTime) {
      const newDuration = calculateDuration(tempStartTime, tempEndTime);
      
      if (newDuration <= 0) {
        alert('End time must be after start time');
        return;
      }
      
      setCurrentStartTime(tempStartTime);
      setCurrentEndTime(tempEndTime);
      setCurrentDuration(newDuration);
      
      // Update booking data
      bookingData.startTime = tempStartTime;
      bookingData.endTime = tempEndTime;
      bookingData.duration = newDuration;
      
      setShowTimeModal(false);
    }
  };

  // Redirect to home if no booking data
  useEffect(() => {
    if (!venueName || !selectedDate) {
      navigate('/');
    }
  }, [venueName, selectedDate, navigate]);

  // Handle add-on selection (for non-perUnit items)
  const handleAddOnToggle = (categoryId, itemId) => {
    const key = `${categoryId}_${itemId}`;
    setSelectedAddOns(prev => {
      const newAddOns = { ...prev };
      if (newAddOns[key]) {
        delete newAddOns[key];
      } else {
        const item = addOnsData[categoryId].items.find(item => item.id === itemId);
        newAddOns[key] = {
          category: categoryId,
          item: item,
          quantity: item.perPerson ? guestCount : 1
        };
      }
      return newAddOns;
    });
  };

  // Handle quantity change for perUnit items (only furniture)
  const handleQuantityChange = (categoryId, itemId, quantity) => {
    const key = `${categoryId}_${itemId}`;
    if (quantity > 0) {
      setSelectedAddOns(prev => ({
        ...prev,
        [key]: {
          category: categoryId,
          item: addOnsData[categoryId].items.find(item => item.id === itemId),
          quantity: quantity
        }
      }));
    } else {
      setSelectedAddOns(prev => {
        const newAddOns = { ...prev };
        delete newAddOns[key];
        return newAddOns;
      });
    }
  };

  // Check if add-on is selected
  const isAddOnSelected = (categoryId, itemId) => {
    return !!selectedAddOns[`${categoryId}_${itemId}`];
  };

  // Get quantity for perUnit items
  const getAddOnQuantity = (categoryId, itemId) => {
    const addOn = selectedAddOns[`${categoryId}_${itemId}`];
    return addOn ? addOn.quantity : 0;
  };

  // Handle section toggle - only one section open at a time
  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // Calculate total add-ons cost
  const calculateAddOnsCost = () => {
    return Object.values(selectedAddOns).reduce((total, addOn) => {
      const itemCost = addOn.item.perPerson 
        ? addOn.item.price * guestCount 
        : addOn.item.price * addOn.quantity;
      return total + itemCost;
    }, 0);
  };

  // Calculate total cost (using current duration for base price calculation)
  const calculateTotalCost = () => {
    const updatedBasePrice = (basePrice / duration) * currentDuration;
    return updatedBasePrice + calculateAddOnsCost();
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    bookingData.selectedDate = newDate;
    setShowCalendarModal(false);
    setTempSelectedDate(null);
    window.location.reload();
  };

  // Generate calendar data
  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const totalDays = 42;
    
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === currentMonth;
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;
      const isSelected = tempSelectedDate && date.toDateString() === tempSelectedDate.toDateString();
      const isOriginalSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isSelected,
        isOriginalSelected,
        isAvailable: !isPast && isCurrentMonth
      });
    }
    
    return days;
  };

  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const monthYear = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  // Handle continue to checkout
  const handleContinueToCheckout = () => {
    if (!selectedRoomArrangement) {
      alert('Please select a room arrangement before proceeding to checkout.');
      return;
    }
    
    const selectedArrangement = roomArrangements.find(arr => arr.id === selectedRoomArrangement);
    
    const finalBookingData = {
      venue: venueName,
      date: selectedDate,
      startTime: currentStartTime,
      endTime: currentEndTime,
      duration: currentDuration,
      guestCount,
      roomArrangement: selectedArrangement ? selectedArrangement.name : null,
      basePrice: (basePrice / duration) * currentDuration,
      addOns: selectedAddOns,
      catering: null,
      addOnsCost: calculateAddOnsCost(),
      cateringCost: 0,
      totalCost: calculateTotalCost()
    };
    
    let confirmationMessage = `Booking Confirmed!\n\nVenue: ${venueName}\nDate: ${selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\nTime: ${convertTo12Hour(currentStartTime)} - ${convertTo12Hour(currentEndTime)}\nDuration: ${currentDuration} hours`;
    
    confirmationMessage += `\nGuests: ${guestCount}`;
    
    if (selectedRoomArrangement) {
      confirmationMessage += `\nRoom Arrangement: ${selectedArrangement.name}`;
    }
    
    if (calculateAddOnsCost() > 0) {
      confirmationMessage += `\nServices: £${calculateAddOnsCost().toFixed(2)}`;
    }
    
    confirmationMessage += `\nTotal Price: £${calculateTotalCost().toFixed(2)}\n\nThank you for your booking!`;
    
    alert(confirmationMessage);
    navigate('/');
  };

  if (!venueName || !selectedDate) {
    return (
      <div className="addons-page">
        <div className="addons-navbar">
          <div className="navbar-content">
            <h1 className="navbar-title">Add Services</h1>
          </div>
        </div>
        <div className="addons-container">
          <div className="loading-message">
            <h2>Loading booking information...</h2>
            <p>If this persists, please return to the venue selection page.</p>
            <button className="back-button" onClick={() => navigate('/')}>
              Return to Venues
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="addons-page">
      {/* Navigation Bar */}
      <div className="addons-navbar">
        <div className="navbar-content">
          <h1 className="navbar-title">Add Services & Extras</h1>
          <div className="navbar-venue">{venueName}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="addons-container">
        {/* Booking Summary Header */}
        <div className="booking-summary-header">
          <h2 className="addons-title">Enhance Your Event</h2>
          <div className="booking-details-header">
            <div 
              className="booking-detail editable-date"
              onClick={() => setShowCalendarModal(true)}
            >
              <strong>Date:</strong> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              <span className="edit-icon">✏️</span>
            </div>
            <div 
              className="booking-detail editable-time"
              onClick={handleOpenTimeModal}
            >
              <strong>Time:</strong> {convertTo12Hour(currentStartTime)} - {convertTo12Hour(currentEndTime)} ({currentDuration} hours)
              <span className="edit-icon">✏️</span>
            </div>
            <div className="booking-detail">
              <strong>Base Price:</strong> £{((basePrice / duration) * currentDuration).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Room Arrangement Selection */}
        <div className="booking-summary-header">
          <h3 className="room-arrangements-title">Select Room Arrangement</h3>
          <div className="room-arrangements-container">
            {roomArrangements.map((arrangement) => (
              <div
                key={arrangement.id}
                className={`room-arrangement-card ${selectedRoomArrangement === arrangement.id ? 'selected' : ''}`}
                onClick={() => handleRoomArrangementSelect(arrangement.id)}
              >
                <img src={arrangement.image} alt={arrangement.name} className="room-arrangement-image" />
                <div className="room-arrangement-name">{arrangement.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="addons-content">
          {/* Left Column - Services */}
          <div className="addons-left-column">
            
            {/* Guest Count Section */}
            <div className="guest-section">
              <div className="guest-header">
                <h3 className="guest-title">Number of Guests</h3>
                <div className="guest-controls">
                  <button 
                    className="guest-btn"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="guest-input"
                    value={guestCount}
                    onChange={handleGuestCountChange}
                    onBlur={handleGuestCountBlur}
                    onFocus={(e) => e.target.select()}
                    onClick={(e) => e.target.select()}
                    min="1"
                    max="1000"
                  />
                  <button 
                    className="guest-btn"
                    onClick={() => setGuestCount(guestCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* All Service Sections */}
            <div className="addons-sections">
              {Object.entries(addOnsData).map(([categoryId, category]) => (
                <div key={categoryId} className="addon-category">
                  <div 
                    className="category-header"
                    onClick={() => toggleSection(categoryId)}
                  >
                    <h3 className="category-title">{category.title}</h3>
                    <div className="category-toggle">
                      <span className={`toggle-icon ${expandedSection === categoryId ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </div>
                  
                  <div className={`addon-items-container ${expandedSection === categoryId ? 'expanded' : 'collapsed'}`}>
                    {categoryId === 'furniture' ? (
                      <div className="furniture-items">
                        {category.items.map((item) => (
                          <div key={item.id} className="furniture-item">
                            <div className="furniture-item-info">
                              <div className="furniture-item-header">
                                <span className="furniture-item-icon">{item.icon}</span>
                                <div className="furniture-item-details">
                                  <h4 className="furniture-item-name">{item.name}</h4>
                                  <p className="furniture-item-description">{item.description}</p>
                                </div>
                                <div className="furniture-item-price">
                                  £{item.price}{item.perUnit ? ' per unit' : ''}
                                </div>
                              </div>
                            </div>
                            <div className="furniture-quantity-controls">
                              <button
                                className="quantity-btn minus"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const currentQty = getAddOnQuantity(categoryId, item.id);
                                  handleQuantityChange(categoryId, item.id, Math.max(0, currentQty - 1));
                                }}
                              >
                                −
                              </button>
                              <input
                                type="number"
                                className="quantity-input"
                                value={getAddOnQuantity(categoryId, item.id)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleQuantityInputChange(categoryId, item.id, e.target.value);
                                }}
                                onBlur={(e) => {
                                  handleQuantityInputBlur(categoryId, item.id, e);
                                }}
                                onFocus={(e) => {
                                  e.stopPropagation();
                                  e.target.select();
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.target.select();
                                }}
                                min="0"
                                max="999"
                              />
                              <button
                                className="quantity-btn plus"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const currentQty = getAddOnQuantity(categoryId, item.id);
                                  handleQuantityChange(categoryId, item.id, currentQty + 1);
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="addon-items">
                        {category.items.map((item) => (
                          <div 
                            key={item.id} 
                            className={`addon-item ${isAddOnSelected(categoryId, item.id) ? 'selected' : ''}`}
                            onClick={() => handleAddOnToggle(categoryId, item.id)}
                          >
                            <div className="addon-item-info">
                              <div className="addon-item-header">
                                <span className="addon-item-icon">{item.icon}</span>
                                <h4 className="addon-item-name">{item.name}</h4>
                              </div>
                              <p className="addon-item-description">{item.description}</p>
                              <p className="addon-item-price">
                                £{item.price}{item.perPerson ? ' per person' : ''}
                              </p>
                            </div>
                            {item.perPerson && isAddOnSelected(categoryId, item.id) && (
                              <div className="guest-count-info">
                                <span className="guest-count-text">{guestCount} guests</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Cost Summary (Sticky) */}
          <div className="addons-right-column">
            <div className="cost-summary-sticky">
              <div className="cost-summary">
                <h3>Cost Summary</h3>
                <div className="cost-breakdown">
                  <div className="cost-section">
                    <div className="cost-line main-item">
                      <div className="cost-description">
                        <span>Venue Rental</span>
                        <div className="cost-details">{currentDuration} hours × £{((basePrice/duration)).toFixed(0)}/hour</div>
                      </div>
                      <span className="cost-amount">£{((basePrice / duration) * currentDuration).toFixed(2)}</span>
                    </div>
                  </div>

                  {Object.keys(selectedAddOns).length > 0 && (
                    <div className="cost-section">
                      <div className="cost-section-title">Services & Add-ons</div>
                      {Object.values(selectedAddOns).map((addOn, index) => {
                        const itemCost = addOn.item.perPerson 
                          ? addOn.item.price * guestCount
                          : addOn.item.price * addOn.quantity;
                        
                        return (
                          <div key={index} className="cost-line sub-item">
                            <div className="cost-description">
                              <span>{addOn.item.name}</span>
                              {addOn.item.perPerson ? (
                                <div className="cost-details">{guestCount} guests × £{addOn.item.price}</div>
                              ) : addOn.quantity > 1 ? (
                                <div className="cost-details">{addOn.quantity} × £{addOn.item.price}</div>
                              ) : null}
                            </div>
                            <span className="cost-amount">£{itemCost.toFixed(2)}</span>
                          </div>
                        );
                      })}
                      <div className="cost-line subtotal">
                        <span>Services Subtotal:</span>
                        <span className="cost-amount">£{calculateAddOnsCost().toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {Object.keys(selectedAddOns).length === 0 && (
                    <div className="empty-state">
                      No additional services selected
                    </div>
                  )}

                  <div className="cost-line total">
                    <div className="cost-description">
                      <span>Total Amount</span>
                      <div className="cost-details">Including all services for {guestCount} guest{guestCount !== 1 ? 's' : ''}</div>
                    </div>
                    <span className="cost-amount">£{calculateTotalCost().toFixed(2)}</span>
                  </div>

                </div>

                <div className="addons-actions">
                  <button className="confirm-button" onClick={handleContinueToCheckout}>
                    Continue to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="calendar-modal-overlay" onClick={() => setShowCalendarModal(false)}>
          <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-modal-header">
              <h3>Select New Date</h3>
              <button 
                className="close-modal-btn"
                onClick={() => setShowCalendarModal(false)}
              >
                ×
              </button>
            </div>
            <div className="calendar-modal-content">
              <div className="calendar-header">
                <h4 className="calendar-month">{monthYear}</h4>
              </div>
              
              <div className="calendar-grid">
                <div className="calendar-weekdays">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="weekday">{day}</div>
                  ))}
                </div>
                
                <div className="calendar-days">
                  {generateCalendarDays().map((dayObj, index) => (
                    <button
                      key={index}
                      className={`calendar-day ${
                        !dayObj.isCurrentMonth ? 'other-month' : ''
                      } ${
                        dayObj.isPast ? 'past' : ''
                      } ${
                        dayObj.isToday ? 'today' : ''
                      } ${
                        dayObj.isSelected ? 'selected' : ''
                      } ${
                        dayObj.isOriginalSelected ? 'original-selected' : ''
                      } ${
                        !dayObj.isAvailable ? 'unavailable' : ''
                      }`}
                      onClick={() => {
                        if (dayObj.isAvailable) {
                          setTempSelectedDate(dayObj.date);
                        }
                      }}
                      disabled={!dayObj.isAvailable}
                    >
                      {dayObj.day}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => {
                    setShowCalendarModal(false);
                    setTempSelectedDate(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="confirm-btn"
                  onClick={() => tempSelectedDate && handleDateChange(tempSelectedDate)}
                  disabled={!tempSelectedDate}
                >
                  Confirm Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Picker Modal */}
      {showTimeModal && (
        <div className="time-modal-overlay" onClick={() => setShowTimeModal(false)}>
          <div className="time-modal" onClick={(e) => e.stopPropagation()}>
            <div className="time-modal-header">
              <h3>Select New Time</h3>
              <button 
                className="close-modal-btn"
                onClick={() => setShowTimeModal(false)}
              >
                ×
              </button>
            </div>
            <div className="time-modal-content">
              <div className="time-pickers">
                <div className="time-picker-section">
                  <label className="time-label">Start Time</label>
                  <select 
                    className="time-select"
                    value={tempStartTime}
                    onChange={(e) => setTempStartTime(e.target.value)}
                  >
                    <option value="">Select start time</option>
                    {generateTimeSlots().map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.display}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="time-picker-section">
                  <label className="time-label">End Time</label>
                  <select 
                    className="time-select"
                    value={tempEndTime}
                    onChange={(e) => setTempEndTime(e.target.value)}
                  >
                    <option value="">Select end time</option>
                    {generateTimeSlots().map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.display}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {tempStartTime && tempEndTime && (
                <div className="duration-preview">
                  <p className="duration-text">
                    Duration: {calculateDuration(tempStartTime, tempEndTime)} hours
                  </p>
                </div>
              )}
              
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => {
                    setShowTimeModal(false);
                    setTempStartTime('');
                    setTempEndTime('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="confirm-btn"
                  onClick={handleTimeChange}
                  disabled={!tempStartTime || !tempEndTime || calculateDuration(tempStartTime, tempEndTime) <= 0}
                >
                  Confirm Time
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOns;