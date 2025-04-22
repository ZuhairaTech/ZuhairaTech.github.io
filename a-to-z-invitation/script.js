const lines = document.querySelectorAll('.invitation-line');
const finalImage = document.getElementById('finalImage');

let currentIndex = 0;

// Show lines up to index
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

// Handle wheel scroll
window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    // Scroll down
    if (currentIndex < lines.length) {
      currentIndex++;
      updateVisibility();
    }
  } else {
    // Scroll up
    if (currentIndex > 0) {
      currentIndex--;
      updateVisibility();
    }
  }
});
