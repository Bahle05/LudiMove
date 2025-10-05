// LudiMove JavaScript Application

// Application Data
const appData = {
  services: [
    {
      name: "Student Moves",
      icon: "🎓",
      description: "Affordable rides for students between campuses, residences, and popular spots around Cape Town",
      features: ["20% student discount", "Campus pickup zones", "Shared ride options", "Late night service"],
      basePrice: "R10 + R6.50/km"
    },
    {
      name: "Light Goods Delivery",
      icon: "📦",
      description: "Safe transport for parcels, textbooks, groceries and small items across the Western Cape",
      features: ["Door-to-door service", "Same-day delivery", "Package tracking", "Fragile item care"],
      basePrice: "R15 + R8/km"
    },
    {
      name: "Personal Rides",
      icon: "🚗",
      description: "Comfortable private transport for individuals and small groups anywhere in Cape Town",
      features: ["Door-to-door service", "Airport transfers", "Event transport", "Flexible scheduling"],
      basePrice: "R12 + R7/km"
    }
  ],
  commonRoutes: [
    {
      from: "UCT Upper Campus",
      to: "Rondebosch Station",
      distance: 2.1,
      estimatedTime: "8 minutes",
      studentFare: 24,
      regularFare: 30
    },
    {
      from: "Stellenbosch University",
      to: "Claremont",
      distance: 18.5,
      estimatedTime: "25 minutes",
      studentFare: 100,
      regularFare: 125
    },
    {
      from: "UCT Residences",
      to: "V&A Waterfront",
      distance: 8.3,
      estimatedTime: "18 minutes",
      studentFare: 54,
      regularFare: 68
    }
  ],
  chatbotResponses: {
    greeting: "Hey there 👋 I'm Ludi, your student ride buddy! How can I help you today?",
    fareEstimate: "I can help you estimate your fare! A typical ride costs R10 base + R6.50 per km. Students get 20% off! What's your pickup and destination?",
    booking: "Booking is super easy! Just use our booking form or WhatsApp Ntobeko directly. Need help with anything specific?",
    safety: "Safety first! 🛡️ Ntobeko is a verified driver with a clean record, and we provide real-time tracking for all rides.",
    areas: "We cover all major student areas: UCT, Stellenbosch, Rondebosch, Claremont, Observatory, and more across Cape Town!",
    student: "Got your student card? You'll get 20% off all rides! Just show it when booking or mention you're a student.",
    default: "I'm here to help with fares, bookings, safety questions, or anything about LudiMove! What would you like to know?"
  }
};

// Mock distance matrix for Cape Town locations
const distanceMatrix = {
  "UCT Upper Campus": {
    "Rondebosch Station": { distance: 2.1, time: 8 },
    "Claremont": { distance: 4.5, time: 12 },
    "Observatory": { distance: 3.2, time: 10 },
    "V&A Waterfront": { distance: 8.3, time: 18 },
    "Stellenbosch University": { distance: 22.1, time: 35 },
    "Cape Town International Airport": { distance: 18.7, time: 28 }
  },
  "UCT Residences": {
    "Rondebosch Station": { distance: 1.8, time: 7 },
    "Claremont": { distance: 3.9, time: 11 },
    "Observatory": { distance: 2.8, time: 9 },
    "V&A Waterfront": { distance: 8.3, time: 18 },
    "Stellenbosch University": { distance: 21.5, time: 34 },
    "Cape Town International Airport": { distance: 17.9, time: 26 }
  },
  "Stellenbosch University": {
    "UCT Upper Campus": { distance: 22.1, time: 35 },
    "UCT Residences": { distance: 21.5, time: 34 },
    "Claremont": { distance: 18.5, time: 25 },
    "Observatory": { distance: 24.3, time: 38 },
    "V&A Waterfront": { distance: 28.9, time: 45 },
    "Cape Town International Airport": { distance: 12.4, time: 18 }
  },
  "Rondebosch Station": {
    "UCT Upper Campus": { distance: 2.1, time: 8 },
    "UCT Residences": { distance: 1.8, time: 7 },
    "Claremont": { distance: 2.7, time: 9 },
    "Observatory": { distance: 4.1, time: 12 },
    "V&A Waterfront": { distance: 9.2, time: 20 },
    "Stellenbosch University": { distance: 20.3, time: 32 }
  },
  "Claremont": {
    "UCT Upper Campus": { distance: 4.5, time: 12 },
    "UCT Residences": { distance: 3.9, time: 11 },
    "Rondebosch Station": { distance: 2.7, time: 9 },
    "Observatory": { distance: 6.8, time: 15 },
    "V&A Waterfront": { distance: 11.5, time: 22 },
    "Stellenbosch University": { distance: 18.5, time: 25 }
  },
  "Observatory": {
    "UCT Upper Campus": { distance: 3.2, time: 10 },
    "UCT Residences": { distance: 2.8, time: 9 },
    "Rondebosch Station": { distance: 4.1, time: 12 },
    "Claremont": { distance: 6.8, time: 15 },
    "V&A Waterfront": { distance: 7.9, time: 17 },
    "Stellenbosch University": { distance: 24.3, time: 38 }
  },
  "V&A Waterfront": {
    "UCT Upper Campus": { distance: 8.3, time: 18 },
    "UCT Residences": { distance: 8.3, time: 18 },
    "Rondebosch Station": { distance: 9.2, time: 20 },
    "Claremont": { distance: 11.5, time: 22 },
    "Observatory": { distance: 7.9, time: 17 },
    "Stellenbosch University": { distance: 28.9, time: 45 }
  },
  "Cape Town International Airport": {
    "UCT Upper Campus": { distance: 18.7, time: 28 },
    "UCT Residences": { distance: 17.9, time: 26 },
    "Stellenbosch University": { distance: 12.4, time: 18 },
    "Claremont": { distance: 15.2, time: 23 },
    "Observatory": { distance: 21.1, time: 32 },
    "V&A Waterfront": { distance: 22.3, time: 35 }
  }
};

// Application State
let currentPage = 'home';
let calculatedFare = null;
let chatbotOpen = false;

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const bookRideBtn = document.querySelector('.book-ride-btn');
const fareCalculator = document.getElementById('calculateFare');
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const quickActions = document.querySelectorAll('.quick-action');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeFareCalculator();
  initializeChatbot();
  initializeBookingForm();
  renderServices();
  renderPopularRoutes();
  setupAnimations();
});

// Navigation Management
function initializeNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('href').substring(1);
      showPage(targetPage);
      updateActiveNav(link);
    });
  });

  bookRideBtn?.addEventListener('click', () => {
    showPage('booking');
    updateActiveNav(document.querySelector('[href="#booking"]'));
  });

  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });
}

function showPage(pageId) {
  pages.forEach(page => {
    page.classList.remove('active');
    if (page.id === pageId) {
      page.classList.add('active');
      currentPage = pageId;
    }
  });
}

function updateActiveNav(activeLink) {
  navLinks.forEach(link => link.classList.remove('active'));
  activeLink?.classList.add('active');
}

// Services Rendering
function renderServices() {
  const detailedServices = document.querySelector('.detailed-services');
  if (!detailedServices) return;

  detailedServices.innerHTML = appData.services.map(service => `
    <div class="service-detail">
      <div class="service-header">
        <span class="service-icon-large">${service.icon}</span>
        <div class="service-title">
          <h2>${service.name}</h2>
          <p class="service-subtitle">${service.description}</p>
        </div>
      </div>
      <div class="service-content">
        <div class="service-features-detailed">
          <h4>What's Included:</h4>
          <ul>
            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        <div class="service-pricing-detailed">
          <h4>Pricing:</h4>
          <div class="price-display">${service.basePrice}</div>
          <button class="btn btn--primary get-quote-btn" data-service="${service.name}">
            Get Quote
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Add event listeners to quote buttons
  document.querySelectorAll('.get-quote-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = e.target.dataset.service;
      showPage('pricing');
      updateActiveNav(document.querySelector('[href="#pricing"]'));
    });
  });
}

// Fare Calculator
function initializeFareCalculator() {
  const calculateBtn = document.getElementById('calculateFare');
  const bookThisRideBtn = document.getElementById('bookThisRide');
  const compareUberBtn = document.getElementById('compareUber');

  calculateBtn?.addEventListener('click', calculateFareEstimate);
  bookThisRideBtn?.addEventListener('click', bookCalculatedRide);
  compareUberBtn?.addEventListener('click', compareWithUber);
}

function calculateFareEstimate() {
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const isStudent = document.getElementById('studentDiscount').checked;

  if (!pickup || !dropoff) {
    alert('Please select both pickup and drop-off locations');
    return;
  }

  if (pickup === dropoff) {
    alert('Pickup and drop-off locations cannot be the same');
    return;
  }

  // Get distance data from mock matrix
  const routeData = distanceMatrix[pickup]?.[dropoff];
  
  if (!routeData) {
    // Generate random data for unmapped routes
    const distance = Math.random() * 20 + 2; // 2-22 km
    const time = Math.round(distance * 2.5 + Math.random() * 10); // Approximate time
    routeData = { distance: parseFloat(distance.toFixed(1)), time };
  }

  // Calculate fares
  const baseFare = 10;
  const ratePerKm = 6.5;
  const regularFare = baseFare + (routeData.distance * ratePerKm);
  const studentFare = isStudent ? regularFare * 0.8 : regularFare;

  // Update results display
  document.getElementById('distance').textContent = `${routeData.distance} km`;
  document.getElementById('estimatedTime').textContent = `${routeData.time} minutes`;
  document.getElementById('regularFare').textContent = `R${Math.round(regularFare)}`;
  document.getElementById('studentFare').textContent = `R${Math.round(studentFare)}`;

  // Show student fare row only if student discount is applied
  const studentFareRow = document.querySelector('.result-item.student-fare');
  studentFareRow.style.display = isStudent ? 'flex' : 'none';

  // Show action buttons
  document.getElementById('bookThisRide').style.display = 'block';
  document.getElementById('compareUber').style.display = 'block';

  // Store calculated fare
  calculatedFare = {
    pickup,
    dropoff,
    distance: routeData.distance,
    time: routeData.time,
    regularFare: Math.round(regularFare),
    studentFare: Math.round(studentFare),
    isStudent
  };

  // Update route visualizer
  updateRouteVisualizer(pickup, dropoff, routeData);
}

function updateRouteVisualizer(pickup, dropoff, routeData) {
  const routeMap = document.getElementById('routeMap');
  
  routeMap.innerHTML = `
    <div class="route-display">
      <div class="route-point">
        <div class="point-icon">📍</div>
        <div class="point-label">FROM</div>
      </div>
      <div class="route-line">
        <div class="route-info">
          <span>${routeData.distance}km</span>
          <span>${routeData.time}min</span>
        </div>
      </div>
      <div class="route-point">
        <div class="point-icon">🎯</div>
        <div class="point-label">TO</div>
      </div>
    </div>
    <div class="route-details-text">
      <p><strong>From:</strong> ${pickup}</p>
      <p><strong>To:</strong> ${dropoff}</p>
    </div>
  `;
}

function bookCalculatedRide() {
  if (!calculatedFare) return;

  // Pre-fill booking form
  document.getElementById('bookingPickup').value = calculatedFare.pickup;
  document.getElementById('bookingDropoff').value = calculatedFare.dropoff;
  document.getElementById('isStudent').checked = calculatedFare.isStudent;

  // Show booking page
  showPage('booking');
  updateActiveNav(document.querySelector('[href="#booking"]'));
  
  // Update booking summary
  updateBookingSummary();
}

function compareWithUber() {
  if (!calculatedFare) return;

  // Create WhatsApp message with comparison
  const message = `Hi! I'd like to compare LudiMove pricing with Uber for this route:\n\nFrom: ${calculatedFare.pickup}\nTo: ${calculatedFare.dropoff}\nDistance: ${calculatedFare.distance}km\n\nLudiMove Price: R${calculatedFare.isStudent ? calculatedFare.studentFare : calculatedFare.regularFare}${calculatedFare.isStudent ? ' (with student discount)' : ''}\n\nCan you help me compare with Uber pricing?`;
  
  const whatsappUrl = `https://wa.me/27XXXXXXXXX?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Popular Routes
function renderPopularRoutes() {
  const routesContainer = document.getElementById('popularRoutes');
  if (!routesContainer) return;

  routesContainer.innerHTML = appData.commonRoutes.map(route => `
    <div class="route-card" data-pickup="${route.from}" data-dropoff="${route.to}">
      <div class="route-path">
        <span>${route.from}</span>
        <span class="route-arrow">→</span>
        <span>${route.to}</span>
      </div>
      <div class="route-details">
        <span>${route.distance}km • ${route.estimatedTime}</span>
        <div class="route-pricing">
          <span class="route-price student">R${route.studentFare}</span>
          <span class="route-price regular">R${route.regularFare}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Add click handlers to populate calculator
  document.querySelectorAll('.route-card').forEach(card => {
    card.addEventListener('click', () => {
      const pickup = card.dataset.pickup;
      const dropoff = card.dataset.dropoff;
      
      document.getElementById('pickup').value = pickup;
      document.getElementById('dropoff').value = dropoff;
      
      // Auto-calculate
      calculateFareEstimate();
    });
  });
}

// Booking Form
function initializeBookingForm() {
  const bookingForm = document.getElementById('bookingForm');
  
  bookingForm?.addEventListener('submit', handleBookingSubmission);
  
  // Update summary when form changes
  const formInputs = bookingForm?.querySelectorAll('input, select');
  formInputs?.forEach(input => {
    input.addEventListener('change', updateBookingSummary);
  });
}

function updateBookingSummary() {
  const pickup = document.getElementById('bookingPickup').value;
  const dropoff = document.getElementById('bookingDropoff').value;
  const isStudent = document.getElementById('isStudent').checked;
  const summary = document.getElementById('bookingSummary');

  if (pickup && dropoff && distanceMatrix[pickup]?.[dropoff]) {
    const routeData = distanceMatrix[pickup][dropoff];
    const baseFare = 10;
    const ratePerKm = 6.5;
    const regularFare = baseFare + (routeData.distance * ratePerKm);
    const finalFare = isStudent ? regularFare * 0.8 : regularFare;

    document.getElementById('summaryDistance').textContent = `${routeData.distance}km`;
    document.getElementById('summaryFare').textContent = `R${Math.round(finalFare)}${isStudent ? ' (student rate)' : ''}`;
    
    summary.style.display = 'block';
  } else {
    summary.style.display = 'none';
  }
}

function handleBookingSubmission(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const bookingData = Object.fromEntries(formData);
  
  // Get form values
  const fullName = document.getElementById('fullName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const pickup = document.getElementById('bookingPickup').value;
  const dropoff = document.getElementById('bookingDropoff').value;
  const serviceType = document.getElementById('serviceType').value;
  const dateTime = document.getElementById('bookingDate').value;
  const isStudent = document.getElementById('isStudent').checked;
  const specialRequirements = document.getElementById('specialRequirements').value;

  // Create WhatsApp message
  const message = createBookingMessage({
    fullName, phoneNumber, pickup, dropoff, serviceType, 
    dateTime, isStudent, specialRequirements
  });
  
  const whatsappUrl = `https://wa.me/27XXXXXXXXX?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  
  // Show success message
  alert('Redirecting to WhatsApp to complete your booking!');
}

function createBookingMessage(data) {
  const date = new Date(data.dateTime).toLocaleString();
  let message = `🚗 NEW LUDIMOVE BOOKING REQUEST\n\n`;
  message += `👤 Name: ${data.fullName}\n`;
  message += `📱 Phone: ${data.phoneNumber}\n\n`;
  message += `📍 Pickup: ${data.pickup}\n`;
  message += `🎯 Drop-off: ${data.dropoff}\n`;
  message += `🚀 Service: ${data.serviceType}\n`;
  message += `📅 Date & Time: ${date}\n\n`;
  
  if (data.isStudent) {
    message += `🎓 Student Discount: YES (20% off)\n`;
  }
  
  if (data.specialRequirements) {
    message += `📝 Special Requirements: ${data.specialRequirements}\n`;
  }
  
  message += `\nPlease confirm availability and final pricing. Thanks!`;
  
  return message;
}

// Chatbot Functionality
function initializeChatbot() {
  chatToggle?.addEventListener('click', toggleChatbot);
  chatClose?.addEventListener('click', closeChatbot);
  chatSend?.addEventListener('click', sendChatMessage);
  chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

  quickActions?.forEach(action => {
    action.addEventListener('click', (e) => {
      const actionType = e.target.dataset.action;
      handleQuickAction(actionType);
    });
  });

  // Show initial notification
  setTimeout(() => {
    const notification = document.getElementById('chatNotification');
    if (notification) notification.style.display = 'flex';
  }, 3000);
}

function toggleChatbot() {
  chatbotOpen = !chatbotOpen;
  chatWindow.style.display = chatbotOpen ? 'flex' : 'none';
  
  if (chatbotOpen) {
    document.getElementById('chatNotification').style.display = 'none';
    chatInput.focus();
  }
}

function closeChatbot() {
  chatbotOpen = false;
  chatWindow.style.display = 'none';
}

function sendChatMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message
  addChatMessage(message, 'user');
  chatInput.value = '';

  // Generate bot response
  setTimeout(() => {
    const response = generateBotResponse(message);
    addChatMessage(response, 'bot');
  }, 1000);
}

function addChatMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  messageDiv.innerHTML = `
    <div class="message-avatar">${sender === 'bot' ? '🤖' : '👤'}</div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleQuickAction(actionType) {
  const responses = appData.chatbotResponses;
  let response = '';

  switch (actionType) {
    case 'fare':
      response = responses.fareEstimate;
      break;
    case 'booking':
      response = responses.booking;
      break;
    case 'safety':
      response = responses.safety;
      break;
    case 'areas':
      response = responses.areas;
      break;
    default:
      response = responses.default;
  }

  addChatMessage(response, 'bot');
}

function generateBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  const responses = appData.chatbotResponses;

  if (lowerMessage.includes('fare') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return responses.fareEstimate;
  } else if (lowerMessage.includes('book') || lowerMessage.includes('reserve')) {
    return responses.booking;
  } else if (lowerMessage.includes('safe') || lowerMessage.includes('security')) {
    return responses.safety;
  } else if (lowerMessage.includes('area') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
    return responses.areas;
  } else if (lowerMessage.includes('student') || lowerMessage.includes('discount')) {
    return responses.student;
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return responses.greeting;
  } else {
    return responses.default;
  }
}

// Animations and Effects
function setupAnimations() {
  // Animate service cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
      }
    });
  }, observerOptions);

  // Observe service cards
  document.querySelectorAll('.service-card, .benefit-item, .testimonial').forEach((el) => {
    observer.observe(el);
  });
}

// Utility Functions
function formatCurrency(amount) {
  return `R${Math.round(amount)}`;
}

function formatDistance(km) {
  return `${km}km`;
}

function formatTime(minutes) {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}

// CSS Animations for dynamic content
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .route-display {
    animation: fadeIn 0.5s ease-in-out;
  }

  .service-detail {
    opacity: 0;
    transform: translateY(30px);
    animation: slideInUp 0.6s ease-out forwards;
  }

  .service-detail:nth-child(2) {
    animation-delay: 0.2s;
  }

  .service-detail:nth-child(3) {
    animation-delay: 0.4s;
  }

  .service-detail {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
    border: 1px solid var(--color-border);
  }

  .service-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .service-icon-large {
    font-size: 48px;
  }

  .service-title h2 {
    color: var(--ludimove-teal);
    margin-bottom: 8px;
  }

  .service-subtitle {
    color: var(--color-text-secondary);
    margin: 0;
  }

  .service-content {
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 24px;
    align-items: start;
  }

  .service-features-detailed h4,
  .service-pricing-detailed h4 {
    color: var(--ludimove-teal);
    margin-bottom: 12px;
  }

  .service-features-detailed ul {
    list-style: none;
    padding: 0;
  }

  .service-features-detailed li {
    padding: 4px 0;
    position: relative;
    padding-left: 20px;
  }

  .service-features-detailed li:before {
    content: "✓";
    color: var(--ludimove-teal);
    font-weight: bold;
    position: absolute;
    left: 0;
  }

  .price-display {
    background: var(--ludimove-teal-light);
    color: var(--ludimove-teal);
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 16px;
  }

  .route-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: var(--ludimove-teal);
    font-weight: 600;
  }

  .route-details-text {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
  }

  .route-details-text p {
    margin: 4px 0;
    font-size: 14px;
  }

  .route-pricing {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  .route-price.student {
    color: var(--ludimove-teal);
    font-weight: 600;
  }

  .route-price.student:before {
    content: "🎓 ";
  }

  .route-price.regular {
    color: var(--color-text-secondary);
    font-size: 12px;
    text-decoration: line-through;
  }

  @media (max-width: 768px) {
    .service-content {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .service-header {
      flex-direction: column;
      text-align: center;
    }
  }
`;

document.head.appendChild(style);