document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".ink-cursor");

    document.addEventListener("mousemove", (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.addEventListener("mousedown", (e) => {
        cursor.style.transform += " scale(2)";
        setTimeout(() => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
        }, 150);
    });
});


// Bar %
document.addEventListener("DOMContentLoaded", function () {
    const skillBars = document.querySelectorAll(".skills");

    skillBars.forEach(skill => {
        skill.addEventListener("mouseenter", showTooltip);
        skill.addEventListener("mousemove", moveTooltip);
        skill.addEventListener("mouseleave", hideTooltip);
    });
});

function showTooltip(event) {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    tooltip.style.display = 'block';
}

function moveTooltip(event) {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    const offsetX = -350; // Adjust as needed
    const offsetY = -50;  // Adjust as needed

    let leftPosition = event.clientX + offsetX;
    let topPosition = event.clientY + window.scrollY + offsetY;

    // Ensure tooltip stays within screen boundaries
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (leftPosition < 10) leftPosition = 10;
    if (leftPosition + tooltip.offsetWidth > screenWidth) {
        leftPosition = screenWidth - tooltip.offsetWidth - 10;
    }
    if (topPosition < 10 + window.scrollY) {
        topPosition = 10 + window.scrollY;
    }
    if (topPosition + tooltip.offsetHeight > window.scrollY + screenHeight) {
        topPosition = window.scrollY + screenHeight - tooltip.offsetHeight - 10;
    }

    tooltip.style.left = `${leftPosition}px`;
    tooltip.style.top = `${topPosition}px`;
}

function hideTooltip() {
    document.querySelectorAll('.tooltip').forEach(tooltip => {
        tooltip.style.display = 'none';
    });
}
