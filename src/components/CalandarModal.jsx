// src/components/CalendarModal.jsx
import React, { useState, useEffect } from 'react';
import './CalendarModal.css';

const CalendarModal = ({ isOpen, onClose, venueName }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [step, setStep] = useState(1); // 1: Date selection, 2: Time selection, 3: Review & checkout
  
  // Hardcoded available dates with different availability statuses
  const availableDates = [
    { date: '2025-05-26', status: 'available' },
    { date: '2025-05-27', status: 'available' },
    { date: '2025-05-28', status: 'available' },
    { date: '2025-05-30', status: 'available' },
    { date: '2025-06-01', status: 'available' },
    { date: '2025-06-05', status: 'available' },
    { date: '2025-06-06', status: 'available' },
    { date: '2025-06-07', status: 'available' },
    { date: '2025-06-09', status: 'available' },
    { date: '2025-06-11', status: 'available' },
    { date: '2025-06-12', status: 'available' },
    { date: '2025-06-13', status: 'available' },
    { date: '2025-06-14', status: 'available' },
    { date: '2025-06-16', status: 'available' },
    { date: '2025-06-19', status: 'available' },
    { date: '2025-06-23', status: 'available' },
    { date: '2025-06-24', status: 'available' },
    { date: '2025-06-25', status: 'available' },
    { date: '2025-06-26', status: 'available' },
    { date: '2025-06-27', status: 'available' },
    { date: '2025-06-30', status: 'available' },
    { date: '2025-07-04', status: 'available' },
    { date: '2025-07-05', status: 'available' },
    { date: '2025-07-07', status: 'available' },
    { date: '2025-07-08', status: 'available' },
    { date: '2025-07-09', status: 'available' },
    { date: '2025-07-10', status: 'available' },
    { date: '2025-07-11', status: 'available' },
    { date: '2025-07-12', status: 'available' },
    { date: '2025-07-14', status: 'available' },
    { date: '2025-07-17', status: 'available' },
    { date: '2025-07-18', status: 'available' },
    { date: '2025-07-19', status: 'available' },
    { date: '2025-07-21', status: 'available' },
    { date: '2025-07-22', status: 'available' },
    { date: '2025-07-23', status: 'available' },
    { date: '2025-07-24', status: 'available' },
    { date: '2025-07-25', status: 'available' },
    { date: '2025-07-28', status: 'available' },
    { date: '2025-07-29', status: 'available' },
    { date: '2025-07-30', status: 'available' },
    { date: '2025-07-31', status: 'available' }
  ];
  
  // Unavailable dates (booked or blocked)
  const unavailableDates = [
    '2025-05-24', '2025-05-25', '2025-05-29',
    '2025-06-02', '2025-06-03', '2025-06-04', '2025-06-08',
    '2025-06-10', '2025-06-15', '2025-06-17', '2025-06-18',
    '2025-06-20', '2025-06-21', '2025-06-22', '2025-06-28', '2025-06-29',
    '2025-07-01', '2025-07-02', '2025-07-03', '2025-07-06',
    '2025-07-13', '2025-07-15', '2025-07-16', '2025-07-20', '2025-07-26', '2025-07-27'
  ];
  
  // Time slot options (24-hour format)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  // Pricing configuration
  const HOURLY_RATE = 100; // £100 per hour
  
  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(null);
      setStartTime('');
      setEndTime('');
      setStep(1);
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
  
  // Check if a date is available
  const isDateAvailable = (date) => {
    const formattedDate = formatDateForCompare(date);
    return availableDates.some(availableDate => availableDate.date === formattedDate);
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
  
  // Calculate duration in hours
  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    
    if (endTotalMinutes <= startTotalMinutes) return 0;
    
    return (endTotalMinutes - startTotalMinutes) / 60;
  };
  
  // Calculate total price
  const calculatePrice = () => {
    const duration = calculateDuration();
    return duration * HOURLY_RATE;
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
      
      const isAvailable = isDateAvailable(date);
      const isUnavailable = isDateUnavailable(date);
      const isPast = isDateInPast(date);
      const isSelected = selectedDate && formatDateForCompare(selectedDate) === dateString;
      
      let dayClass = 'calendar-day';
      let status = '';
      
      if (isPast) {
        dayClass += ' past';
        status = 'Past';
      } else if (isUnavailable) {
        dayClass += ' unavailable';
        status = 'Booked';
      } else if (isAvailable) {
        dayClass += ' available';
        if (isSelected) {
          dayClass += ' selected';
          status = 'Selected';
        }
      } else {
        dayClass += ' unavailable';
      }
      
      days.push(
        <div
          key={day}
          className={dayClass}
          onClick={() => {
            if (isAvailable && !isPast) {
              setSelectedDate(date);
            }
          }}
        >
          <span className="day-number">{day}</span>
          {status && <span className={`status-indicator ${status.toLowerCase()}`}>{status}</span>}
        </div>
      );
    }
    
    return days;
  };
  
  // Handle step navigation
  const goToNextStep = () => {
    if (step === 1 && selectedDate) {
      setStep(2);
    } else if (step === 2 && startTime && endTime && calculateDuration() > 0) {
      setStep(3);
    }
  };
  
  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Handle booking confirmation
  const handleConfirmBooking = () => {
    const duration = calculateDuration();
    const totalPrice = calculatePrice();
    
    alert(`Booking Confirmed!\n\nVenue: ${venueName}\nDate: ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\nTime: ${startTime} - ${endTime}\nDuration: ${duration} hours\nTotal Price: £${totalPrice.toFixed(2)}\n\nThank you for your booking!`);
    onClose();
  };
  
  // Filter end time options based on start time
  const getValidEndTimes = () => {
    if (!startTime) return [];
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    
    return timeSlots.filter(time => {
      const [hour, minute] = time.split(':').map(Number);
      const totalMinutes = hour * 60 + minute;
      return totalMinutes > startTotalMinutes;
    });
  };

  return (
    <div className="calendar-modal-overlay" onClick={onClose}>
      <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">
              {step === 1 && 'Select Date'}
              {step === 2 && 'Select Time'}
              {step === 3 && 'Review & Checkout'}
            </h2>
            <h3 className="venue-name">{venueName}</h3>
            
            {/* Step indicator */}
            <div className="step-indicator">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
              <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
              <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
            </div>
          </div>
          
          {/* Step 1: Date Selection */}
          {step === 1 && (
            <>
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
            </>
          )}
          
          {/* Step 2: Time Selection */}
          {step === 2 && (
            <div className="time-selection">
              <div className="selected-date-display">
                <p><strong>Selected Date:</strong> {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              
              <div className="time-inputs">
                <div className="time-input-group">
                  <label htmlFor="start-time">Start Time:</label>
                  <div className="time-select-wrapper">
                    <select 
                      id="start-time"
                      value={startTime} 
                      onChange={(e) => {
                        setStartTime(e.target.value);
                        setEndTime(''); // Reset end time when start time changes
                      }}
                      className="time-select"
                    >
                      <option value="">Select start time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <span className="time-select-icon">▼</span>
                  </div>
                </div>
                
                <div className="time-input-group">
                  <label htmlFor="end-time">End Time:</label>
                  <div className={`time-select-wrapper ${!startTime ? 'disabled' : ''}`}>
                    <select 
                      id="end-time"
                      value={endTime} 
                      onChange={(e) => setEndTime(e.target.value)}
                      className="time-select"
                      disabled={!startTime}
                    >
                      <option value="">Select end time</option>
                      {getValidEndTimes().map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <span className="time-select-icon">▼</span>
                  </div>
                </div>
              </div>
              
              {startTime && endTime && calculateDuration() > 0 && (
                <div className="duration-display">
                  <p><strong>Duration:</strong> {calculateDuration()} hours</p>
                  <p><strong>Rate:</strong> £{HOURLY_RATE}/hour</p>
                  <p className="total-price"><strong>Total Price: £{calculatePrice().toFixed(2)}</strong></p>
                </div>
              )}
            </div>
          )}
          
          {/* Step 3: Review & Checkout */}
          {step === 3 && (
            <div className="booking-review">
              <h4>Booking Summary</h4>
              <div className="booking-details">
                <div className="detail-row">
                  <span className="detail-label">Venue:</span>
                  <span className="detail-value">{venueName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{startTime} - {endTime}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{calculateDuration()} hours</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Rate:</span>
                  <span className="detail-value">£{HOURLY_RATE}/hour</span>
                </div>
                <div className="detail-row total">
                  <span className="detail-label">Total Price:</span>
                  <span className="detail-value">£{calculatePrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Modal Actions */}
        <div className="modal-actions">
          {step > 1 && (
            <button className="back-button" onClick={goToPreviousStep}>
              Back
            </button>
          )}
          
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          
          {step < 3 ? (
            <button 
              className="next-button" 
              disabled={
                (step === 1 && !selectedDate) || 
                (step === 2 && (!startTime || !endTime || calculateDuration() <= 0))
              }
              onClick={goToNextStep}
            >
              Next
            </button>
          ) : (
            <button 
              className="confirm-button" 
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;