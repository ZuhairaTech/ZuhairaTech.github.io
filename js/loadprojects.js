document.addEventListener("DOMContentLoaded", function () {
    fetch("../html/sectionsprojects.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("project-container").innerHTML = data;

            // 🟢 Now that sections are loaded, initialize navigation
            handleNavigation();

            // Reattach event listener for hash changes
            window.addEventListener("hashchange", handleNavigation);
        })
        .catch(error => console.error("Error loading sections:", error));
});

