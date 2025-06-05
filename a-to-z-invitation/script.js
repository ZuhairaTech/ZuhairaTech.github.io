// =============================================================================
// WEDDING INVITATION TEMPLATE - CONFIGURATION
// =============================================================================
if (sessionStorage.getItem('landingShown') === 'true') {
    const WEDDING_CONFIG = {
    // Wedding Details
    weddingDate: "Feb 14, 2026 12:01:00", // Format: "MMM DD, YYYY HH:mm:ss"
    
    // Location Settings
    location: {
      googleMapsUrl: "https://maps.app.goo.gl/H8Ay22CgTzp73WMi6",
      wazeUrl: "https://waze.com/ul/hw30e559hb", // Replace with your actual Waze URL
      modalText: {
        title: "Pilih Aplikasi Peta",
        subtitle: "Buka lokasi dengan aplikasi pilihan anda",
        googleMaps: "Google Maps",
        waze: "Waze",
        cancel: "Batal"
      }
    },
    
    // Slideshow Settings
    slideshow: {
      autoAdvanceDelay: 5000, // milliseconds
      enableAutoAdvance: true
    },
    
    // Animation Settings
    animation: {
      mobileRevealDelay: 1200, // milliseconds between line reveals on mobile
      mobileScrollDelay: 150,  // delay before scrolling to revealed line
      buttonShowDelay: 500     // delay before showing buttons after all lines are visible
    },
    
    // Responsive Settings
    breakpoint: {
      mobile: 768 // pixels
    },
    
    // Google Sheets Configuration
    wishes: {
      sheetId: '1sl330GOsuyc2haR334yMX-bIxcPnxJw97sPkz8Q6-3o', // Replace with client's Sheet ID
      useCsvMethod: true,
      range: 'Sheet1!A:F',
      nameColumn: 2,    // Column C (0-indexed)
      wishColumn: 5,    // Column F (0-indexed)
      refreshInterval: 5 * 60 * 1000, // 5 minutes in milliseconds
      loadingMessages: {
        loading: 'Memuatkan ucapan...',
        error: 'Gagal memuatkan ucapan. Sila semak sambungan internet anda dan cuba lagi.',
        noWishes: 'Tiada ucapan dijumpai dalam spreadsheet.',
        noValidWishes: 'Tiada ucapan yang sah dijumpai. Sila pastikan lajur nama dan ucapan mengandungi data.',
        statsTemplate: 'Jumlah ucapan: <strong>{count}</strong>'
      }
    },
    
    // UI Text (easily customizable for different languages)
    ui: {
      scrollButton: {
        viewWishes: "Lihat Ucapan",
        backToTop: "Kembali ke Atas"
      }
    }
  };

  // =============================================================================
  // WEDDING INVITATION CORE CLASS
  // =============================================================================

  class WeddingInvitation {
    constructor(config = WEDDING_CONFIG) {
      this.config = config;
      this.state = {
        currentIndex: 0,
        slideIndex: 0,
        slideTimer: null,
        isMobile: window.innerWidth <= config.breakpoint.mobile,
        countdownTimer: null
      };
      
      this.elements = this.initializeElements();
      this.init();
    }

    // Initialize DOM elements
    initializeElements() {
      return {
        lines: document.querySelectorAll('.invitation-line'),
        slideshowContainer: document.getElementById('slideshowContainer'),
        buttonContainer: document.querySelector('.button-container'),
        backBtn: document.getElementById('backBtn'),
        scrollToggleBtn: document.getElementById('scrollToggleBtn'),
        wishesSection: document.getElementById('wishes-section'),
        locationModal: document.getElementById('locationModal'),
        countdown: {
          days: document.getElementById("countdown-days"),
          hours: document.getElementById("countdown-hours"),
          minutes: document.getElementById("countdown-minutes"),
          seconds: document.getElementById("countdown-seconds")
        },
        wishes: {
          loading: document.getElementById('wishes-loading'),
          error: document.getElementById('wishes-error'),
          stats: document.getElementById('wishes-stats'),
          grid: document.getElementById('wishes-grid')
        }
      };
    }

    // Initialize all components
    init() {
      this.setupScrollReveal();
      this.initializeSlideshow();
      this.initializeCountdown();
      this.initializeWishes();
      this.setupScrollToggle();
      this.setupBackButton();
      this.setupWishesRefreshButton();
      this.setupLocationModal(); // Add location modal setup
    }

    // =============================================================================
    // LOCATION MODAL MODULE
    // =============================================================================

    setupLocationModal() {
      // Make location modal functions globally accessible for HTML onclick handlers
      window.openLocationModal = () => this.openLocationModal();
      window.closeLocationModal = () => this.closeLocationModal();
      
      // Close modal when clicking outside of it
      window.addEventListener('click', (event) => {
        if (this.elements.locationModal && event.target === this.elements.locationModal) {
          this.closeLocationModal();
        }
      });

      // Close modal with Escape key
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          this.closeLocationModal();
        }
      });
      
      // Update modal content with config text
      this.updateLocationModalContent();
    }

    openLocationModal() {
      if (this.elements.locationModal) {
        this.elements.locationModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    }

    closeLocationModal() {
      if (this.elements.locationModal) {
        this.elements.locationModal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
      }
    }

    updateLocationModalContent() {
      if (!this.elements.locationModal) return;
      
      const modalTitle = this.elements.locationModal.querySelector('.modal-header h3');
      const modalSubtitle = this.elements.locationModal.querySelector('.modal-header p');
      const googleBtn = this.elements.locationModal.querySelector('.btn-google');
      const wazeBtn = this.elements.locationModal.querySelector('.btn-waze');
      const cancelBtn = this.elements.locationModal.querySelector('.btn-cancel');
      
      if (modalTitle) {
        modalTitle.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${this.config.location.modalText.title}`;
      }
      if (modalSubtitle) {
        modalSubtitle.textContent = this.config.location.modalText.subtitle;
      }
      if (googleBtn) {
        googleBtn.href = this.config.location.googleMapsUrl;
        googleBtn.innerHTML = `<i class="fab fa-google"></i> ${this.config.location.modalText.googleMaps}`;
      }
      if (wazeBtn) {
        wazeBtn.href = this.config.location.wazeUrl;
        wazeBtn.innerHTML = `<i class="fab fa-waze"></i> ${this.config.location.modalText.waze}`;
      }
      if (cancelBtn) {
        cancelBtn.innerHTML = `<i class="fas fa-times"></i> ${this.config.location.modalText.cancel}`;
      }
    }

    // =============================================================================
    // SCROLL REVEAL MODULE
    // =============================================================================

    setupScrollReveal() {
      if (this.state.isMobile) {
        this.setupMobileAutoReveal();
      } else {
        this.setupDesktopManualReveal();
      }
    }

    setupMobileAutoReveal() {
      const autoReveal = setInterval(() => {
        if (this.state.currentIndex < this.elements.lines.length) {
          this.state.currentIndex++;
          this.updateVisibility();
          this.smoothScrollToLatestLine();
        } else {
          clearInterval(autoReveal);
        }
      }, this.config.animation.mobileRevealDelay);
    }

    setupDesktopManualReveal() {
      // Mouse wheel scroll
      window.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0 && this.state.currentIndex < this.elements.lines.length) {
          this.state.currentIndex++;
          this.updateVisibility();
        } else if (e.deltaY < 0 && this.state.currentIndex > 0) {
          this.state.currentIndex--;
          this.updateVisibility();
        }
      }, { passive: false });

      // Click to advance
      window.addEventListener('click', (e) => {
        if (this.shouldIgnoreClick(e.target)) return;
        
        if (this.state.currentIndex < this.elements.lines.length) {
          this.state.currentIndex++;
          this.updateVisibility();
        }
      });
    }

    shouldIgnoreClick(target) {
      const ignoreClasses = ['prev', 'next', 'dot', 'info-button', 'map-button', 'back-button', 'modal', 'modal-content', 'modal-btn'];
      return ignoreClasses.some(className => target.classList.contains(className)) ||
            target.closest('.modal') !== null;
    }

    smoothScrollToLatestLine() {
      const lastVisibleLine = this.elements.lines[this.state.currentIndex - 1];
      if (lastVisibleLine) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            lastVisibleLine.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          });
        }, this.config.animation.mobileScrollDelay);
      }
    }

    updateVisibility() {
      // Update line visibility
      this.elements.lines.forEach((line, index) => {
        line.classList.toggle('visible', index <= this.state.currentIndex);
      });

      // Show/hide slideshow and buttons
      if (this.state.currentIndex >= this.elements.lines.length) {
        this.elements.slideshowContainer.classList.add('visible');
        
        setTimeout(() => {
          if (this.elements.buttonContainer) {
            this.elements.buttonContainer.classList.add('visible');
          }
        }, this.config.animation.buttonShowDelay);
      } else {
        this.elements.slideshowContainer.classList.remove('visible');
        if (this.elements.buttonContainer) {
          this.elements.buttonContainer.classList.remove('visible');
        }
      }
    }

    // =============================================================================
    // SLIDESHOW MODULE
    // =============================================================================

    initializeSlideshow() {
      this.showSlides();
      if (this.config.slideshow.enableAutoAdvance) {
        this.startSlideTimer();
      }
      
      // Make slideshow methods globally accessible for HTML onclick handlers
      window.changeSlide = (n) => this.changeSlide(n);
      window.currentSlide = (n) => this.setCurrentSlide(n);
    }

    showSlides() {
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.dot');
      
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active-dot'));
      
      if (slides.length > 0) {
        slides[this.state.slideIndex].classList.add('active');
        if (dots.length > 0) {
          dots[this.state.slideIndex].classList.add('active-dot');
        }
      }
    }

    changeSlide(n) {
      this.clearSlideTimer();
      const slides = document.querySelectorAll('.slide');
      this.state.slideIndex += n;
      
      if (this.state.slideIndex >= slides.length) {
        this.state.slideIndex = 0;
      } else if (this.state.slideIndex < 0) {
        this.state.slideIndex = slides.length - 1;
      }
      
      this.showSlides();
      if (this.config.slideshow.enableAutoAdvance) {
        this.startSlideTimer();
      }
    }

    setCurrentSlide(n) {
      this.clearSlideTimer();
      this.state.slideIndex = n;
      this.showSlides();
      if (this.config.slideshow.enableAutoAdvance) {
        this.startSlideTimer();
      }
    }

    startSlideTimer() {
      this.state.slideTimer = setTimeout(() => {
        this.changeSlide(1);
      }, this.config.slideshow.autoAdvanceDelay);
    }

    clearSlideTimer() {
      if (this.state.slideTimer) {
        clearTimeout(this.state.slideTimer);
        this.state.slideTimer = null;
      }
    }

    // =============================================================================
    // COUNTDOWN MODULE
    // =============================================================================

    initializeCountdown() {
      if (!this.elements.countdown.days) return;
      
      this.updateCountdown();
      this.state.countdownTimer = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    }

    updateCountdown() {
      const weddingDate = new Date(this.config.weddingDate).getTime();
      const now = new Date().getTime();
      const distance = weddingDate - now;
      
      if (distance < 0) {
        this.setCountdownToZero();
        if (this.state.countdownTimer) {
          clearInterval(this.state.countdownTimer);
        }
        return;
      }
      
      const timeUnits = this.calculateTimeUnits(distance);
      this.updateCountdownDisplay(timeUnits);
    }

    calculateTimeUnits(distance) {
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    }

    updateCountdownDisplay(timeUnits) {
      this.elements.countdown.days.textContent = timeUnits.days;
      this.elements.countdown.hours.textContent = timeUnits.hours;
      this.elements.countdown.minutes.textContent = timeUnits.minutes;
      this.elements.countdown.seconds.textContent = timeUnits.seconds;
    }

    setCountdownToZero() {
      Object.values(this.elements.countdown).forEach(el => {
        if (el) el.textContent = "0";
      });
    }

    // =============================================================================
    // WISHES MODULE
    // =============================================================================

    initializeWishes() {
      window.addEventListener('load', () => this.loadWishes());
      setInterval(() => this.loadWishes(), this.config.wishes.refreshInterval);
    }

    setupWishesRefreshButton() {
      const button = document.querySelector('.refresh-btn');
      if (button) {
        button.addEventListener('click', () => this.loadWishes());
      }
    }

    async loadWishes() {
      this.showWishesLoading();
      
      try {
        const data = await this.loadWishesFromCSV();
        this.displayWishes(data);
      } catch (error) {
        console.error('Error loading wishes:', error);
        this.showWishesError(this.config.wishes.loadingMessages.error);
      }
      
      this.hideWishesLoading();
    }

    async loadWishesFromCSV() {
      const csvUrl = `https://docs.google.com/spreadsheets/d/${this.config.wishes.sheetId}/export?format=csv`;
      const response = await fetch(csvUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      return this.parseCSV(csvText);
    }

    parseCSV(csvText) {
      const lines = csvText.split('\n');
      const result = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const cells = line.split(',').map(cell => 
            cell.replace(/^"|"$/g, '').trim()
          );
          result.push(cells);
        }
      }
      
      return result;
    }

    displayWishes(data) {
      if (!data || data.length <= 1) {
        this.showWishesError(this.config.wishes.loadingMessages.noWishes);
        return;
      }

      const validWishes = this.filterValidWishes(data);
      
      if (validWishes.length === 0) {
        this.showWishesError(this.config.wishes.loadingMessages.noValidWishes);
        return;
      }

      this.updateWishesStats(validWishes.length);
      this.renderWishCards(validWishes);
    }

    filterValidWishes(data) {
      return data.slice(1).filter(row => {
        const name = row[this.config.wishes.nameColumn] ? 
          row[this.config.wishes.nameColumn].toString().trim() : '';
        const wish = row[this.config.wishes.wishColumn] ? 
          row[this.config.wishes.wishColumn].toString().trim() : '';
        return name && wish;
      });
    }

    updateWishesStats(count) {
      this.elements.wishes.stats.innerHTML = 
        this.config.wishes.loadingMessages.statsTemplate.replace('{count}', count);
      this.elements.wishes.stats.style.display = 'block';
    }

    renderWishCards(validWishes) {
      this.elements.wishes.grid.innerHTML = validWishes.map(row => {
        const name = row[this.config.wishes.nameColumn].toString().trim();
        const wish = row[this.config.wishes.wishColumn].toString().trim();
        
        return `
          <div class="wish-card">
            <div class="wish-text">${this.escapeHtml(wish)}</div>
            <div class="wish-author">${this.escapeHtml(name)}</div>
          </div>
        `;
      }).join('');
    }

    showWishesLoading() {
      this.elements.wishes.loading.style.display = 'flex';
      this.elements.wishes.error.style.display = 'none';
      this.elements.wishes.stats.style.display = 'none';
      this.elements.wishes.grid.innerHTML = '';
    }

    hideWishesLoading() {
      this.elements.wishes.loading.style.display = 'none';
    }

    showWishesError(message) {
      this.elements.wishes.error.textContent = message;
      this.elements.wishes.error.style.display = 'block';
    }

    escapeHtml(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // =============================================================================
    // SCROLL TOGGLE MODULE
    // =============================================================================

    setupScrollToggle() {
      if (!this.elements.scrollToggleBtn) return;
      
      // Make toggleScroll globally accessible for HTML onclick handlers
      window.toggleScroll = () => this.toggleScroll();
      
      window.addEventListener('scroll', () => this.updateScrollButton());
    }

    toggleScroll() {
      const wishesRect = this.elements.wishesSection.getBoundingClientRect();
      const isAtWishes = wishesRect.top <= 100 && wishesRect.bottom >= 100;
      
      if (isAtWishes) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        this.elements.wishesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

    updateScrollButton() {
      if (!this.elements.scrollToggleBtn || !this.elements.wishesSection) return;
      
      const wishesRect = this.elements.wishesSection.getBoundingClientRect();
      const isAtWishes = wishesRect.top <= 100 && wishesRect.bottom >= 100;
      
      if (isAtWishes) {
        this.elements.scrollToggleBtn.classList.add('at-wishes');
        this.elements.scrollToggleBtn.title = this.config.ui.scrollButton.backToTop;
        this.elements.scrollToggleBtn.innerHTML = '<i class="fa fa-chevron-up"></i>';
      } else {
        this.elements.scrollToggleBtn.classList.remove('at-wishes');
        this.elements.scrollToggleBtn.title = this.config.ui.scrollButton.viewWishes;
        this.elements.scrollToggleBtn.innerHTML = '<i class="fa fa-chevron-down"></i>';
      }
    }

    // =============================================================================
    // BACK BUTTON MODULE
    // =============================================================================

    setupBackButton() {
      if (!this.elements.backBtn) return;
      
      this.elements.backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.state.currentIndex > 0) {
          this.state.currentIndex--;
          this.updateVisibility();
        }
      });
    }

    // =============================================================================
    // PUBLIC METHODS FOR EXTERNAL ACCESS
    // =============================================================================

    // Method to update configuration after initialization
    updateConfig(newConfig) {
      this.config = { ...this.config, ...newConfig };
      this.updateLocationModalContent(); // Update modal content when config changes
    }

    // Method to manually trigger wishes reload
    reloadWishes() {
      this.loadWishes();
    }

    // Method to reset invitation state
    reset() {
      this.state.currentIndex = 0;
      this.state.slideIndex = 0;
      this.updateVisibility();
      this.showSlides();
    }

    // Cleanup method
    destroy() {
      if (this.state.slideTimer) clearTimeout(this.state.slideTimer);
      if (this.state.countdownTimer) clearInterval(this.state.countdownTimer);
    }
  }

  // =============================================================================
  // INITIALIZATION
  // =============================================================================

  // Initialize the wedding invitation when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    window.weddingInvitation = new WeddingInvitation(WEDDING_CONFIG);
  });

  // =============================================================================
  // CONFIGURATION HELPER FUNCTIONS
  // =============================================================================

  // Helper function to create custom configuration for different clients
  function createWeddingConfig(customConfig) {
    return {
      ...WEDDING_CONFIG,
      ...customConfig,
      location: {
        ...WEDDING_CONFIG.location,
        ...(customConfig.location || {})
      },
      wishes: {
        ...WEDDING_CONFIG.wishes,
        ...(customConfig.wishes || {})
      },
      animation: {
        ...WEDDING_CONFIG.animation,
        ...(customConfig.animation || {})
      },
      slideshow: {
        ...WEDDING_CONFIG.slideshow,
        ...(customConfig.slideshow || {})
      },
      ui: {
        ...WEDDING_CONFIG.ui,
        ...(customConfig.ui || {})
      }
    };
  }

  // Export for module usage (if needed)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WeddingInvitation, createWeddingConfig, WEDDING_CONFIG };
  }
  console.log("Invitation page initialized.");
  // e.g., start countdown, load wishes, enable buttons, etc.
}
