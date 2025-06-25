// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add fade-in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        const overlay = document.querySelector('.radial-overlay');

        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth * 100;
            const y = e.clientY / window.innerHeight * 100;

            overlay.style.background = `
                radial-gradient(circle at ${x - 10}% ${y - 10}%, rgba(76, 122, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at ${x + 10}% ${y + 10}%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)
            `;
        });

        function googleTranslateElementInit() {
            new google.translate.TranslateElement({ 
                pageLanguage: 'en',
                includedLanguages: 'en,ms,ja,ru,zh,es,fr,de,ar,hi,ko,th,vi,id', // Limit to specific languages
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        }

        // Enhanced toggle functionality with animations
        document.addEventListener('DOMContentLoaded', function () {
            const translateIcon = document.getElementById('translate-icon');
            const translateContainer = document.getElementById('google_translate_container');
            const closeButton = document.getElementById('translate-close');

            // Show translate container
            translateIcon.addEventListener('click', function (e) {
                e.preventDefault();
                translateContainer.classList.add('show');
            });

            // Hide translate container
            closeButton.addEventListener('click', function () {
                translateContainer.classList.remove('show');
            });

            // Hide when clicking outside
            document.addEventListener('click', function (e) {
                if (!translateContainer.contains(e.target) && !translateIcon.contains(e.target)) {
                    translateContainer.classList.remove('show');
                }
            });

            // Prevent container from closing when clicking inside it
            translateContainer.addEventListener('click', function (e) {
                e.stopPropagation();
            });

            // Add smooth transitions when language changes
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        // Language changed, add a subtle fade effect
                        document.body.style.transition = 'opacity 0.3s ease';
                        document.body.style.opacity = '0.8';
                        setTimeout(() => {
                            document.body.style.opacity = '1';
                        }, 300);
                    }
                });
            });

            // Start observing
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });


        //Pop up project details
        document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('projectModal');
            const closeBtn = document.querySelector('.close-btn');
            const projectButtons = document.querySelectorAll('.view-project-btn');
            const modalContent = document.getElementById('modalProjectContent');

            const projectData = {
                garden: `
                    <h2>Garden Planning Add-on</h2>
                    <p>
                        A Blender add-on that simulates plant growth using Python and L-systems. 
                        It generates dynamic plant structures with randomized branching, allowing users to explore natural growth patterns in a virtual environment.
                    </p>
                    <a href="https://github.com/ZuhairaTech/garden-planner-lsystem.git" target="_blank">View on GitHub</a>
                `,

                hackcessible: `
                    <h2>Hackcessible</h2>
                    <p>
                        An assistive drumming device created for the Hackcessible event. 
                        Built with Arduino and C++, the project enhances musical accessibility and was developed in collaboration with users and a multidisciplinary team.
                    </p>
                    <a href="https://www.linkedin.com/company/hackcessible/posts/?feedView=all" target="_blank">View on LinkedIn</a>
                `,

                viridis: `
                    <h2>Viridis</h2>
                    <p>
                        A sustainability-themed mobile app designed to encourage eco-friendly habits. 
                        It offers daily challenges and tracks green activities to promote environmental awareness and conscious living.
                    </p>
                    <a href="https://github.com/yourproject" target="_blank">View on GitHub</a>
                `
            };


            projectButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const projectKey = button.getAttribute('data-project');
                    modalContent.innerHTML = projectData[projectKey];
                    modal.style.display = 'block';
                });
            });

            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
