// arrows for scrollings
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".projects-container");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
      
    const scrollAmount = 220; 
    
    // Scroll right
    rightArrow.addEventListener("click", () => {
        container.scrollLeft += scrollAmount;
    });
    
    // Scroll left
    leftArrow.addEventListener("click", () => {
        container.scrollLeft -= scrollAmount;
    });
});

//
document.addEventListener("DOMContentLoaded", () => {
    const collapsibles = document.querySelectorAll(".collapsible");
    collapsibles.forEach((collapsible) => {
        collapsible.addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            
            if (this.classList.contains("active")) {
                // If active, set max-height to a large enough value
                content.style.maxHeight = content.scrollHeight + "px"; // Scroll height of the content
            } else {
                // If not active, set max-height to 0 to collapse
                content.style.maxHeight = "0";
            }
        });
    });
});