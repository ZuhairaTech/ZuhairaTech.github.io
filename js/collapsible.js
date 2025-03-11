document.addEventListener("DOMContentLoaded", () => {
    const collapsibles = document.querySelectorAll(".collapsible");
    collapsibles.forEach((collapsible) => {
        collapsible.addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;

            if (this.classList.contains("active")) {
                content.style.transition = "none"; 
                content.style.maxHeight = content.scrollHeight + "px";
                setTimeout(() => {
                    content.style.transition = "max-height 0.3s ease-out"; 
                }, 10);
            } else {
                content.style.maxHeight = "0";
            }
        });
    });
});