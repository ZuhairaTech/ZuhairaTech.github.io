const lines = document.querySelectorAll('.invitation-line');
const slideshowContainer = document.getElementById('slideshowContainer');
const buttonContainer = document.querySelector('.button-container');
let currentIndex = 0;
let slideIndex = 0;
let slideTimer;
let isMobile = window.innerWidth <= 768;

// Update visibility of elements as user scrolls/clicks
function updateVisibility() {
  lines.forEach((line, index) => {
    line.classList.toggle('visible', index <= currentIndex);
  });

  // When we've shown all lines, make slideshow and buttons visible
  if (currentIndex >= lines.length) {
    slideshowContainer.classList.add('visible');
    
    // Show button container with slight delay for effect
    setTimeout(() => {
      if (buttonContainer) buttonContainer.classList.add('visible');
    }, 500);
  } else {
    // Hide everything if we go back
    slideshowContainer.classList.remove('visible');
    if (buttonContainer) buttonContainer.classList.remove('visible');
  }
}

// Slideshow Functions
function showSlides() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active-dot');
  });
  
  // Show current slide and active dot
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active-dot');
}

// Next/previous controls
function changeSlide(n) {
  clearTimeout(slideTimer); // Reset the timer when manual navigation happens
  const slides = document.querySelectorAll('.slide');
  slideIndex += n;
  
  // Loop back to first/last slide if needed
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  
  showSlides();
  startSlideTimer(); // Restart the timer
}

// Set current slide
function currentSlide(n) {
  clearTimeout(slideTimer); // Reset the timer when manual navigation happens
  slideIndex = n;
  showSlides();
  startSlideTimer(); // Restart the timer
}

// Auto advance slideshow
function startSlideTimer() {
  slideTimer = setTimeout(() => {
    changeSlide(1);
  }, 5000); // Change image every 5 seconds
}

// Auto-scroll reveal for mobile
if (isMobile) {
  let autoReveal = setInterval(() => {
    if (currentIndex < lines.length) {
      currentIndex++;
      updateVisibility();
    } else {
      clearInterval(autoReveal);
    }
  }, 1000); // adjust timing
} else {
  // Manual scroll for desktop
  window.addEventListener('wheel', (e) => {
    e.preventDefault(); // Prevent default scroll
    if (e.deltaY > 0 && currentIndex < lines.length) {
      currentIndex++;
      updateVisibility();
    } else if (e.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
      updateVisibility();
    }
  }, { passive: false });

  // Click to advance
  window.addEventListener('click', (e) => {
    // Only advance if click is not on slideshow controls
    if (!e.target.classList.contains('prev') && 
        !e.target.classList.contains('next') && 
        !e.target.classList.contains('dot') &&
        !e.target.classList.contains('info-button') &&
        !e.target.classList.contains('map-button') &&
        !e.target.classList.contains('back-button')) {
      if (currentIndex < lines.length) {
        currentIndex++;
        updateVisibility();
      }
    }
  });
}

// Back button functionality
const backBtn = document.getElementById('backBtn');
if (backBtn) {
  backBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the window click event
    if (currentIndex > 0) {
      currentIndex--;
      updateVisibility();
    }
  });
}

// Countdown Timer Script
const weddingDate = new Date("Feb 14, 2026 00:00:00").getTime();
  
function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  
  // Calculate days, hours, minutes, seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Update the countdown display
  document.getElementById("countdown-days").textContent = days;
  document.getElementById("countdown-hours").textContent = hours;
  document.getElementById("countdown-minutes").textContent = minutes;
  document.getElementById("countdown-seconds").textContent = seconds;
  
  // If the countdown is over
  if (distance < 0) {
    clearInterval(countdownTimer);
    document.getElementById("countdown-days").textContent = "0";
    document.getElementById("countdown-hours").textContent = "0";
    document.getElementById("countdown-minutes").textContent = "0";
    document.getElementById("countdown-seconds").textContent = "0";
  }
}

// Update the countdown every second
updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

// Initialize slideshow and visibility
showSlides();
startSlideTimer();
updateVisibility();


    // Configuration - Replace with your Google Sheet ID
    const WISHES_CONFIG = {
      SHEET_ID: '1sl330GOsuyc2haR334yMX-bIxcPnxJw97sPkz8Q6-3o', // Replace with your actual Sheet ID
      USE_CSV_METHOD: true, // Using CSV method for simplicity
      RANGE: 'Sheet1!A:F'
    };

    // Scroll to wishes section
    function scrollToWishes() {
      document.getElementById('wishes-section').scrollIntoView({ 
        behavior: 'smooth' 
      });
    }

    // Load wishes from Google Sheets
    async function loadWishes() {
      const loadingEl = document.getElementById('wishes-loading');
      const errorEl = document.getElementById('wishes-error');
      const statsEl = document.getElementById('wishes-stats');
      const gridEl = document.getElementById('wishes-grid');

      // Show loading state
      loadingEl.style.display = 'flex';
      errorEl.style.display = 'none';
      statsEl.style.display = 'none';
      gridEl.innerHTML = '';

      try {
        const data = await loadWishesFromCSV();
        displayWishes(data);
      } catch (error) {
        console.error('Error loading wishes:', error);
        showWishesError('Gagal memuatkan ucapan. Sila semak sambungan internet anda dan cuba lagi.');
      }

      loadingEl.style.display = 'none';
    }

    // Load wishes using CSV method
    async function loadWishesFromCSV() {
      const csvUrl = `https://docs.google.com/spreadsheets/d/${WISHES_CONFIG.SHEET_ID}/export?format=csv`;
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      return parseCSV(csvText);
    }

    // Parse CSV data
    function parseCSV(csvText) {
      const lines = csvText.split('\n');
      const result = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          // Simple CSV parsing
          const cells = line.split(',').map(cell => 
            cell.replace(/^"|"$/g, '').trim()
          );
          result.push(cells);
        }
      }
      
      return result;
    }

    // Display wishes on the page
    function displayWishes(data) {
      const gridEl = document.getElementById('wishes-grid');
      const statsEl = document.getElementById('wishes-stats');
      
      if (!data || data.length <= 1) {
        showWishesError('Tiada ucapan dijumpai dalam spreadsheet.');
        return;
      }

      // Filter valid wishes (skip header row)
      const validWishes = data.slice(1).filter(row => {
        const name = row[2] ? row[2].toString().trim() : ''; // Column C
        const wish = row[5] ? row[5].toString().trim() : ''; // Column F
        return name && wish;
      });

      if (validWishes.length === 0) {
        showWishesError('Tiada ucapan yang sah dijumpai. Sila pastikan lajur B (nama) dan F (ucapan) mengandungi data.');
        return;
      }

      // Show statistics
      statsEl.innerHTML = `📊 Jumlah ucapan diterima: <strong>${validWishes.length}</strong>`;
      statsEl.style.display = 'block';

      // Create wish cards
      gridEl.innerHTML = validWishes.map(row => {
        const name = row[2].toString().trim(); // Column B
        const wish = row[5].toString().trim(); // Column F
        
        return `
          <div class="wish-card">
            <div class="wish-text">${escapeHtml(wish)}</div>
            <div class="wish-author">${escapeHtml(name)}</div>
          </div>
        `;
      }).join('');
    }

    // Show error message
    function showWishesError(message) {
      const errorEl = document.getElementById('wishes-error');
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }

    // Escape HTML to prevent XSS
    function escapeHtml(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // Auto-refresh wishes every 5 minutes
    setInterval(loadWishes, 5 * 60 * 1000);

    // Load wishes when page loads
    window.addEventListener('load', loadWishes);

    // Hide floating button when in wishes section
    window.addEventListener('scroll', function() {
      const wishesSection = document.getElementById('wishes-section');
      const floatingBtn = document.querySelector('.scroll-to-wishes');
      const rect = wishesSection.getBoundingClientRect();
      
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        floatingBtn.style.display = 'none';
      } else {
        floatingBtn.style.display = 'block';
      }
    });