document.addEventListener("DOMContentLoaded", function () {
    fetch("../html/sectionsmain.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("content-container").innerHTML = data;

            // 🟢 Now that sections are loaded, initialize navigation
            handleNavigation();

            // Reattach event listener for hash changes
            window.addEventListener("hashchange", handleNavigation);
        })
        .catch(error => console.error("Error loading sections:", error));
});

  function showCertificates() {
    document.getElementById("education-content").style.display = "none";
    document.getElementById("certificates").style.display = "block";
  }

  function hideCertificates() {
    document.getElementById("certificates").style.display = "none";
    document.getElementById("education-content").style.display = "block";
  }




