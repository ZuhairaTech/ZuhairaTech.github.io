
document.addEventListener("DOMContentLoaded", function () {

    // 🟢 Load Navigation Bar
    document.getElementById("header-container-project").innerHTML = `
        <div class="vertical-social-icons">
            <a href="mailto:zuhairanasrin.zakaria@gmail.com" target="_blank"><i class="fa fa-fw fa-envelope"></i></a>
            <a href="http://www.linkedin.com/in/zuhaira-nasrin-zakaria/" target="_blank"><i class="fa fa-fw fa-linkedin-square"></i></a>
            <a href="https://medium.com/@zuhairanasrin.zakaria" target="_blank"><i class="fa fa-fw fa-medium"></i></a>
            <a href="https://www.hackerrank.com/profile/zuhairanasrin77" target="_blank"><i class="fa fa-fw fa-code"></i></a>
            <a href="https://github.com/ZuhairaTech/" target="_blank"><i class="fa fa-fw fa-github"></i></a>
            <a href="https://bloomopine.blogspot.com/" target="_blank"><i class="fa fa-fw fa-leaf"></i></a>
        </div>
        <nav id="myNav" class="nav">
            <img src="/images/logopurple.png" alt="Avatar" class="avatar" id="logo">
            <a href="/html/projectsmain.html">Overview</a>
            <a href="/html/projects/gardenPlanning.html">Garden Planning</a>
            <a href="/html/projects/hackcessible.html">Hackcessible</a>
            <a href="/html/projects/viridis.html">Viridis</a>
            <a href="javascript:void(0);" class="iconburger" id="burger-menu">
                <i class="fa fa-bars"></i>
            </a>
        </nav>
    `;

    // 🟢 Wait for elements to load before adding event listeners
    setTimeout(() => {
        const logo = document.getElementById("logo");

        logo.addEventListener("mouseenter", function () {
            this.style.opacity = "0";
            setTimeout(() => {
                this.src = "/images/logolightpurple.png";
                this.style.opacity = "1";
            }, 300);
        });

        logo.addEventListener("mouseleave", function () {
            this.style.opacity = "0";
            setTimeout(() => {
                this.src = "/images/logopurple.png";
                this.style.opacity = "1";
            }, 300);
        });

        logo.addEventListener("click", function () {
            window.location.href = "/";
        });        

        // 🟢 Fix burger navigation event
        document.getElementById("burger-menu").addEventListener("click", burgernav);
    }, 100);
});