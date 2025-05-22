// src/components/AddOns.jsx
import React, { useState, useEffect } from 'react';
import './AddOns.css';

const AddOns = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  venueName, 
  selectedDate, 
  startTime, 
  endTime, 
  duration, 
  basePrice 
}) => {
  const [guestCount, setGuestCount] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [selectedCatering, setSelectedCatering] = useState(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState({});
  
  // Available add-ons with pricing
  const addOnsData = {
    equipment: {
      title: "Audio Visual Equipment",
      items: [
        { id: 'projector', name: 'HD Projector', price: 75, description: 'High-definition projector with screen' },
        { id: 'sound_system', name: 'Sound System', price: 100, description: 'Professional audio system with microphones' },
        { id: 'lighting', name: 'Professional Lighting', price: 150, description: 'Stage and ambient lighting setup' },
        { id: 'screens', name: 'Additional Screens', price: 50, description: 'Extra plasma screens for presentations' },
        { id: 'microphones', name: 'Wireless Microphones', price: 30, description: 'Set of 4 wireless microphones' }
      ]
    },
    furniture: {
      title: "Furniture & Setup",
      items: [
        { id: 'chairs_standard', name: 'Standard Chairs', price: 5, description: 'Per chair - comfortable standard seating', perUnit: true },
        { id: 'chairs_premium', name: 'Premium Chairs', price: 8, description: 'Per chair - luxury upholstered seating', perUnit: true },
        { id: 'tables_round', name: 'Round Tables', price: 25, description: 'Per table - seats 8-10 people', perUnit: true },
        { id: 'tables_rectangular', name: 'Rectangular Tables', price: 20, description: 'Per table - seats 6-8 people', perUnit: true },
        { id: 'whiteboard', name: 'Whiteboards', price: 35, description: 'Mobile whiteboards with markers' },
        { id: 'podium', name: 'Speaker Podium', price: 40, description: 'Professional speaking podium' }
      ]
    },
    services: {
      title: "Additional Services",
      items: [
        { id: 'tech_support', name: 'Technical Support', price: 200, description: 'On-site technical assistance throughout event' },
        { id: 'event_coordinator', name: 'Event Coordinator', price: 300, description: 'Dedicated event coordinator' },
        { id: 'security', name: 'Security Service', price: 150, description: 'Professional security personnel' },
        { id: 'photography', name: 'Event Photography', price: 400, description: 'Professional photographer for 4 hours' },
        { id: 'cleaning', name: 'Post-Event Cleaning', price: 100, description: 'Complete venue cleaning service' }
      ]
    }
  };

  // Catering packages
  const cateringPackages = {
    breakfast: {
      name: "Continental Breakfast",
      pricePerPerson: 18,
      description: "Fresh pastries, fruits, coffee, tea, and juice",
      items: [
        { id: 'pastries', name: 'Assorted Pastries', included: true },
        { id: 'fresh_fruit', name: 'Fresh Fruit Platter', included: true },
        { id: 'coffee_tea', name: 'Coffee & Tea Service', included: true },
        { id: 'orange_juice', name: 'Fresh Orange Juice', included: true },
        { id: 'yogurt', name: 'Greek Yogurt with Granola', price: 4, description: 'Add premium yogurt option' },
        { id: 'hot_breakfast', name: 'Hot Breakfast Items', price: 8, description: 'Scrambled eggs, bacon, sausages' }
      ]
    },
    lunch: {
      name: "Business Lunch",
      pricePerPerson: 35,
      description: "Three-course business lunch with beverages",
      items: [
        { id: 'soup_salad', name: 'Soup or Salad', included: true },
        { id: 'main_course', name: 'Choice of Main Course', included: true },
        { id: 'dessert', name: 'Dessert Selection', included: true },
        { id: 'beverages', name: 'Soft Drinks & Water', included: true },
        { id: 'wine_pairing', name: 'Wine Pairing', price: 15, description: 'Selected wines to complement the meal' },
        { id: 'vegetarian', name: 'Vegetarian Options', price: 0, description: 'Additional vegetarian main courses' },
        { id: 'premium_protein', name: 'Premium Protein Upgrade', price: 12, description: 'Upgrade to premium steak or salmon' }
      ]
    },
    dinner: {
      name: "Gala Dinner",
      pricePerPerson: 65,
      description: "Elegant four-course dinner with wine service",
      items: [
        { id: 'appetizer', name: 'Gourmet Appetizer', included: true },
        { id: 'soup_course', name: 'Soup Course', included: true },
        { id: 'main_dinner', name: 'Premium Main Course', included: true },
        { id: 'dessert_course', name: 'Chef\'s Dessert', included: true },
        { id: 'wine_service', name: 'Wine Service', included: true },
        { id: 'champagne_reception', name: 'Champagne Reception', price: 20, description: 'Welcome champagne for all guests' },
        { id: 'cheese_course', name: 'Cheese Course', price: 10, description: 'Selection of artisan cheeses' },
        { id: 'premium_wines', name: 'Premium Wine Selection', price: 25, description: 'Upgrade to premium wine pairings' }
      ]
    },
    cocktail: {
      name: "Cocktail Reception",
      pricePerPerson: 28,
      description: "Elegant cocktail reception with canapés",
      items: [
        { id: 'canapes', name: 'Assorted Canapés', included: true },
        { id: 'finger_foods', name: 'Finger Foods Selection', included: true },
        { id: 'house_wine', name: 'House Wine & Beer', included: true },
        { id: 'soft_drinks_cocktail', name: 'Soft Drinks', included: true },
        { id: 'premium_bar', name: 'Premium Bar Service', price: 18, description: 'Top-shelf spirits and cocktails' },
        { id: 'live_station', name: 'Live Cooking Station', price: 12, description: 'Chef-prepared items made to order' },
        { id: 'seafood_station', name: 'Seafood Station', price: 22, description: 'Fresh oysters, shrimp, and salmon' }
      ]
    }
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setGuestCount(1);
      setSelectedAddOns({});
      setSelectedCatering(null);
      setSelectedMenuItems({});
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

  // Handle add-on selection (for non-perUnit items)
  const handleAddOnToggle = (categoryId, itemId) => {
    const key = `${categoryId}_${itemId}`;
    setSelectedAddOns(prev => {
      const newAddOns = { ...prev };
      if (newAddOns[key]) {
        delete newAddOns[key];
      } else {
        newAddOns[key] = {
          category: categoryId,
          item: addOnsData[categoryId].items.find(item => item.id === itemId),
          quantity: 1
        };
      }
      return newAddOns;
    });
  };

  // Handle quantity change for perUnit items
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

  // Handle catering package selection
  const handleCateringChange = (packageId) => {
    setSelectedCatering(packageId);
    setSelectedMenuItems({}); // Reset menu items when changing package
  };

  // Handle menu item selection
  const handleMenuItemChange = (itemId, selected) => {
    setSelectedMenuItems(prev => ({
      ...prev,
      [itemId]: selected
    }));
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

  // Calculate total add-ons cost
  const calculateAddOnsCost = () => {
    return Object.values(selectedAddOns).reduce((total, addOn) => {
      const itemCost = addOn.item.price * addOn.quantity;
      return total + itemCost;
    }, 0);
  };

  // Calculate catering cost
  const calculateCateringCost = () => {
    if (!selectedCatering) return 0;
    
    const packageCost = cateringPackages[selectedCatering].pricePerPerson * guestCount;
    const menuItemsCost = Object.entries(selectedMenuItems).reduce((total, [itemId, selected]) => {
      if (selected) {
        const item = cateringPackages[selectedCatering].items.find(item => item.id === itemId);
        return total + (item.price || 0) * guestCount;
      }
      return total;
    }, 0);
    
    return packageCost + menuItemsCost;
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    return basePrice + calculateAddOnsCost() + calculateCateringCost();
  };

  // Handle confirmation
  const handleConfirm = () => {
    const bookingData = {
      venue: venueName,
      date: selectedDate,
      startTime,
      endTime,
      duration,
      guestCount,
      basePrice,
      addOns: selectedAddOns,
      catering: selectedCatering ? {
        package: selectedCatering,
        packageDetails: cateringPackages[selectedCatering],
        menuItems: selectedMenuItems
      } : null,
      addOnsCost: calculateAddOnsCost(),
      cateringCost: calculateCateringCost(),
      totalCost: calculateTotalCost()
    };
    
    onConfirm(bookingData);
  };

  // Handle skip add-ons
  const handleSkipAddOns = () => {
    const bookingData = {
      venue: venueName,
      date: selectedDate,
      startTime,
      endTime,
      duration,
      guestCount: 1, // Default guest count
      basePrice,
      addOns: {},
      catering: null,
      addOnsCost: 0,
      cateringCost: 0,
      totalCost: basePrice
    };
    
    onConfirm(bookingData);
  };

  return (
    <div className="addons-modal-overlay" onClick={onClose}>
      <div className="addons-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="addons-modal-body">
          <div className="addons-header">
            <h2 className="addons-title">Add-Ons & Services</h2>
            <h3 className="venue-name">{venueName}</h3>
            <div className="booking-summary">
              <p><strong>Date:</strong> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> {startTime} - {endTime} ({duration} hours)</p>
            </div>
          </div>

          {/* Guest Count */}
          <div className="guest-count-section">
            <h4>Number of Guests</h4>
            <div className="guest-count-controls">
              <button 
                className="guest-count-btn"
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
              >
                -
              </button>
              <span className="guest-count-display">{guestCount}</span>
              <button 
                className="guest-count-btn"
                onClick={() => setGuestCount(guestCount + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add-Ons Sections */}
          <div className="addons-sections">
            {Object.entries(addOnsData).map(([categoryId, category]) => (
              <div key={categoryId} className="addon-category">
                <h4 className="category-title">{category.title}</h4>
                <div className="addon-items">
                  {category.items.map((item) => (
                    <div 
                      key={item.id} 
                      className={`addon-item ${isAddOnSelected(categoryId, item.id) ? 'selected' : ''}`}
                      onClick={() => {
                        if (!item.perUnit) {
                          handleAddOnToggle(categoryId, item.id);
                        }
                      }}
                    >
                      <div className="addon-item-info">
                        <h5 className="addon-item-name">{item.name}</h5>
                        <p className="addon-item-description">{item.description}</p>
                        <p className="addon-item-price">
                          £{item.price}{item.perUnit ? ' per unit' : ''}
                        </p>
                      </div>
                      <div className="addon-item-controls">
                        {item.perUnit ? (
                          <div className="quantity-controls">
                            <span className="quantity-label">Quantity:</span>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={getAddOnQuantity(categoryId, item.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                const quantity = parseInt(e.target.value) || 0;
                                handleQuantityChange(categoryId, item.id, quantity);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="quantity-input"
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Catering Section */}
          <div className="catering-section">
            <h4 className="category-title">Catering Packages</h4>
            <div className="catering-packages">
              {Object.entries(cateringPackages).map(([packageId, packageData]) => (
                <div 
                  key={packageId} 
                  className={`catering-package ${selectedCatering === packageId ? 'selected' : ''}`}
                  onClick={() => handleCateringChange(packageId)}
                >
                  <div className="package-header">
                    <input
                      type="radio"
                      id={packageId}
                      name="catering"
                      checked={selectedCatering === packageId}
                      onChange={() => handleCateringChange(packageId)}
                      className="package-radio"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label htmlFor={packageId} className="package-label">
                      <h5 className="package-name">{packageData.name}</h5>
                      <p className="package-description">{packageData.description}</p>
                      <p className="package-price">£{packageData.pricePerPerson} per person</p>
                    </label>
                  </div>
                  
                  {selectedCatering === packageId && (
                    <div className="menu-items">
                      <h6>Customize Your Menu</h6>
                      {packageData.items.map((item) => (
                        <div key={item.id} className="menu-item">
                          <div className="menu-item-info">
                            <span className="menu-item-name">
                              {item.name}
                              {item.included && <span className="included-badge">Included</span>}
                            </span>
                            {item.description && (
                              <p className="menu-item-description">{item.description}</p>
                            )}
                            {item.price && (
                              <p className="menu-item-price">+£{item.price} per person</p>
                            )}
                          </div>
                          {!item.included && (
                            <input
                              type="checkbox"
                              checked={selectedMenuItems[item.id] || false}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleMenuItemChange(item.id, e.target.checked);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="menu-item-checkbox"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

         {/* Cost Summary */}
          <div className="cost-summary">
            <h4>Cost Summary</h4>
            <div className="cost-breakdown">
              {/* Base Venue Cost */}
              <div className="cost-section">
                <div className="cost-line main-item">
                  <div className="cost-description">
                    <span>Venue Rental</span>
                    <div className="cost-details">{duration} hours × £{basePrice/duration}/hour</div>
                  </div>
                  <span className="cost-amount">£{basePrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Add-ons Section */}
              {Object.keys(selectedAddOns).length > 0 && (
                <div className="cost-section">
                  <div className="cost-section-title">Add-ons & Services</div>
                  {Object.values(selectedAddOns).map((addOn, index) => (
                    <div key={index} className="cost-line sub-item">
                      <div className="cost-description">
                        <span>{addOn.item.name}</span>
                        {addOn.quantity > 1 && (
                          <div className="cost-details">{addOn.quantity} × £{addOn.item.price}</div>
                        )}
                      </div>
                      <span className="cost-amount">£{(addOn.item.price * addOn.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="cost-line subtotal">
                    <span>Add-ons Subtotal:</span>
                    <span className="cost-amount">£{calculateAddOnsCost().toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Catering Section */}
              {selectedCatering && (
                <div className="cost-section">
                  <div className="cost-section-title">Catering</div>
                  <div className="cost-line sub-item">
                    <div className="cost-description">
                      <span>{cateringPackages[selectedCatering].name}</span>
                      <div className="cost-details">{guestCount} guests × £{cateringPackages[selectedCatering].pricePerPerson}</div>
                    </div>
                    <span className="cost-amount">£{(cateringPackages[selectedCatering].pricePerPerson * guestCount).toFixed(2)}</span>
                  </div>
                  
                  {/* Menu Add-ons */}
                  {Object.entries(selectedMenuItems).map(([itemId, selected]) => {
                    if (!selected) return null;
                    const item = cateringPackages[selectedCatering].items.find(item => item.id === itemId);
                    if (!item || !item.price) return null;
                    return (
                      <div key={itemId} className="cost-line sub-item">
                        <div className="cost-description">
                          <span>{item.name}</span>
                          <div className="cost-details">{guestCount} guests × £{item.price}</div>
                        </div>
                        <span className="cost-amount">£{(item.price * guestCount).toFixed(2)}</span>
                      </div>
                    );
                  })}
                  
                  <div className="cost-line subtotal">
                    <span>Catering Subtotal:</span>
                    <span className="cost-amount">£{calculateCateringCost().toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Empty state for no add-ons */}
              {Object.keys(selectedAddOns).length === 0 && !selectedCatering && (
                <div className="empty-state">
                  No additional services selected
                </div>
              )}

              {/* Total */}
              <div className="cost-line total">
                <div className="cost-description">
                  <span>Total Amount</span>
                  <div className="cost-details">Including all services for {guestCount} guest{guestCount !== 1 ? 's' : ''}</div>
                </div>
                <span className="cost-amount">£{calculateTotalCost().toFixed(2)}</span>
              </div>

              {/* Savings indicator if applicable */}
              {(calculateAddOnsCost() > 500 || calculateCateringCost() > 1000) && (
                <div className="cost-savings">
                  <p className="savings-text">
                    🎉 Great choice! You're getting premium services for your event.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Modal Actions */}
        <div className="addons-modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="skip-button" onClick={handleSkipAddOns}>
            Continue Without Add-ons
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Continue with Add-ons
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOns;