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

// Initialize slideshow and visibility
showSlides();
startSlideTimer();
updateVisibility();
