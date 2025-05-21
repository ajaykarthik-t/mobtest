// src/components/CalandarModal.jsx
import React, { useState, useEffect } from 'react';
import './CalandarModal.css'; // Fixed import path to match file name

const CalendarModal = ({ isOpen, onClose, venueName }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Hardcoded unavailable dates (simulating already booked dates)
  // Format: 'YYYY-MM-DD'
  const unavailableDates = [
    '2025-05-24', '2025-05-25', 
    '2025-06-02', '2025-06-03', '2025-06-04',
    '2025-06-10', '2025-06-17', '2025-06-18',
    '2025-06-20', '2025-06-21', '2025-06-22',
    '2025-07-01', '2025-07-02', '2025-07-03',
    '2025-07-15', '2025-07-16'
  ];
  
  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(null);
      setCurrentDate(new Date());
    }
  }, [isOpen]);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Calendar navigation functions
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  // Date formatting helpers
  const formatDateHeader = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  const formatDateForCompare = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  // Check if a date is unavailable (already booked)
  const isDateUnavailable = (date) => {
    const formattedDate = formatDateForCompare(date);
    return unavailableDates.includes(formattedDate);
  };
  
  // Check if a date is in the past
  const isDateInPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = formatDateForCompare(date);
      
      const isUnavailable = isDateUnavailable(date);
      const isPast = isDateInPast(date);
      const isSelected = selectedDate && formatDateForCompare(selectedDate) === dateString;
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${isUnavailable || isPast ? 'unavailable' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => {
            if (!isUnavailable && !isPast) {
              setSelectedDate(date);
            }
          }}
        >
          <span className="day-number">{day}</span>
          {isUnavailable && <span className="status-indicator booked">Booked</span>}
          {isPast && <span className="status-indicator past">Past</span>}
          {isSelected && <span className="status-indicator selected">Selected</span>}
        </div>
      );
    }
    
    return days;
  };
  
  // Handle booking request
  const handleBooking = () => {
    if (selectedDate) {
      alert(`Booking request for ${venueName} on ${selectedDate.toLocaleDateString()} submitted. We'll be in touch soon!`);
      onClose();
    } else {
      alert('Please select a date to continue.');
    }
  };

  return (
    <div className="calendar-modal-overlay" onClick={onClose}>
      <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2 className="modal-title">Check Availability</h2>
        <h3 className="venue-name">{venueName}</h3>
        
        <div className="calendar-container">
          <div className="calendar-header">
            <button className="month-nav" onClick={prevMonth}>❮</button>
            <h4 className="month-title">{formatDateHeader(currentDate)}</h4>
            <button className="month-nav" onClick={nextMonth}>❯</button>
          </div>
          
          <div className="weekday-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          
          <div className="calendar-days">
            {generateCalendarDays()}
          </div>
        </div>
        
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-color unavailable"></div>
            <span>Unavailable</span>
          </div>
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <span>Selected</span>
          </div>
        </div>
        
        <div className="selected-date-info">
          {selectedDate ? (
            <p>Selected date: <strong>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
          ) : (
            <p>Please select an available date</p>
          )}
        </div>
        
        <div className="modal-actions">
          <button 
            className="cancel-button" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="book-button" 
            disabled={!selectedDate}
            onClick={handleBooking}
          >
            Request Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;