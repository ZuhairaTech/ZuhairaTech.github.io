// JavaScript to enable carousel functionality
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".projects-container");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
  
    const scrollAmount = 300; // Adjust scroll amount as needed
  
    // Scroll right
    rightArrow.addEventListener("click", () => {
      container.scrollLeft += scrollAmount;
    });
  
    // Scroll left
    leftArrow.addEventListener("click", () => {
      container.scrollLeft -= scrollAmount;
    });
  });
  