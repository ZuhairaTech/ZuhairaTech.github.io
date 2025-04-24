const lines = document.querySelectorAll('.invitation-line');
const finalImage = document.getElementById('finalImage');
let currentIndex = 0;
let isMobile = window.innerWidth <= 768; // adjust as needed

function updateVisibility() {
  lines.forEach((line, index) => {
    line.classList.toggle('visible', index <= currentIndex);
  });

  if (currentIndex >= lines.length) {
    finalImage.classList.add('visible');
  } else {
    finalImage.classList.remove('visible');
  }
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
    if (e.deltaY > 0 && currentIndex < lines.length) {
      currentIndex++;
      updateVisibility();
    } else if (e.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
      updateVisibility();
    }
  });

  // Click to advance
  window.addEventListener('click', () => {
    if (currentIndex < lines.length) {
      currentIndex++;
      updateVisibility();
    }
  });

  document.getElementById('backBtn').addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateVisibility();
    }
  });
}
