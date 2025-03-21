function getImagePath(imageName) {
    let basePath = window.location.pathname.includes("html/") ? "../images/" : "images/";
    return basePath + imageName;
}

document.addEventListener("DOMContentLoaded", function () {

    // 🟢 Load Navigation Bar
    document.getElementById("header-container").innerHTML = `
        <div class="vertical-social-icons">
            <a href="mailto:zuhairanasrin.zakaria@gmail.com" target="_blank"><i class="fa-solid fa-envelope"></i></a>
            <a href="http://www.linkedin.com/in/zuhaira-nasrin-zakaria/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://medium.com/@zuhairanasrin.zakaria" target="_blank"><i class="fa-brands fa-medium"></i></a>
            <a href="https://www.hackerrank.com/profile/zuhairanasrin77" target="_blank"><i class="fa-solid fa-code"></i></a>
            <a href="https://github.com/ZuhairaTech/" target="_blank"><i class="fa-brands fa-github"></i></a>
            <a href="https://www.goodreads.com/user/show/188515408-zuhaira" target="_blank"><i class="fa-brands fa-goodreads"></i></a>
        </div>

        <nav id="myNav" class="nav">
            <a href="/" id="logo-container">
                <img src="${getImagePath('logopurple.png')}" alt="Avatar" class="avatar" id="logo">
            </a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
            <a href="javascript:void(0);" class="iconburger" id="burger-menu">
                <i class="fa fa-bars"></i>
            </a>
        </nav>
    `;

    // 🟢 Wait for elements to load before adding event listeners
    setTimeout(() => {
        const logoContainer = document.getElementById("logo-container");

        function updateLogo() {
            if (window.innerWidth < 900) {
                // Change logo to text 'Home'
                if (!document.getElementById("home-text")) {
                    logoContainer.innerHTML = '<span id="home-text">Home</span>';
                }
            } else {
                // Restore logo if it was changed
                if (document.getElementById("home-text")) {
                    logoContainer.innerHTML = `<img src="${getImagePath('logopurple.png')}" alt="Avatar" class="avatar" id="logo">`;
                }
                addHoverEffect();
            }
        }

        function addHoverEffect() {
            const logo = document.getElementById("logo");
            if (logo) {
                logo.addEventListener("mouseenter", function () {
                    this.style.opacity = "0";
                    setTimeout(() => {
                        this.src = getImagePath("logolightpurple.png");
                        this.style.opacity = "1";
                    }, 300);
                });

                logo.addEventListener("mouseleave", function () {
                    this.style.opacity = "0";
                    setTimeout(() => {
                        this.src = getImagePath("logopurple.png");
                        this.style.opacity = "1";
                    }, 300);
                });

                logo.addEventListener("click", function () {
                    window.location.href = "/";
                });
            }
        }

        // Run on page load & resize
        updateLogo();
        window.addEventListener("resize", updateLogo);
    }, 100);

    document.getElementById("burger-menu").addEventListener("click", burgernav);
});

// 🟢 Section Navigation Handling
function handleNavigation() {
    const sections = document.querySelectorAll("section");
    let hash = window.location.hash.substring(1); // Remove the '#' symbol

    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.style.opacity = "0";
            section.classList.remove("active");
        });

        // Show the selected section after a short delay
        setTimeout(() => {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active");
                targetSection.style.opacity = "1";
            }
        }, 300);
    }

    if (hash) {
        showSection(hash);
    } else {
        showSection("about"); // Default to About section
    }
}

// 🟢 Burger Menu for Mobile
function burgernav() {
    var x = document.getElementById("myNav");
    if (x.classList.contains("responsive")) {
        x.classList.remove("responsive");
    } else {
        x.classList.add("responsive");
    }
}

// 🟢 Highlight Active Navigation Link
function activateNav(event) {
    var navLinks = document.querySelectorAll('#myNav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

var navLinks = document.querySelectorAll('#myNav a');
navLinks.forEach(link => {
    link.addEventListener('click', activateNav);
});
