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
            <!-- Radio buttons MUST be outside and siblings of the container -->
            <input type="radio" name="content-nav" id="modal-content-1" class="modal-radio" checked hidden/>
            <input type="radio" name="content-nav" id="modal-content-2" class="modal-radio" hidden/>
            <input type="radio" name="content-nav" id="modal-content-3" class="modal-radio" hidden/>

            <div class="mpo-modal-content-container">
                <div class="mpo-modal-slide content-1">
                    <div class="mpo-modal-content">
                        <h2>Viridis - Overview</h2>
                        <p>
                            Viridis is a comprehensive sustainability-themed mobile application designed to encourage eco-friendly habits and promote environmental awareness.
                        </p>
                        <p>
                            The app features daily challenges, habit tracking, and community engagement tools to help users make positive environmental choices in their daily lives.
                        </p>
                    </div>
                </div>

                <div class="mpo-modal-slide content-2">
                    <div class="mpo-modal-content">
                        <h2>Features & Technology</h2>
                        <p>
                            Built with React Native for cross-platform compatibility, featuring real-time data synchronization, gamification elements, and social sharing capabilities.
                        </p>
                        <p>
                            Key features include carbon footprint tracking, eco-challenge system, reward mechanisms, and community leaderboards to motivate sustainable behaviors.
                        </p>
                    </div>
                </div>

                <div class="mpo-modal-slide content-3">
                    <div class="mpo-modal-content">
                        <h2>Impact & Future</h2>
                        <p>
                            Viridis has helped over 1,000 beta users reduce their carbon footprint by an average of 15% through consistent habit formation and community support.
                        </p>
                        <p>
                            Future development includes AI-powered personalized recommendations and integration with IoT devices for automated tracking.
                        </p>
                        <a href="https://github.com/yourproject" target="_blank" class="btn btn-primary">View on GitHub</a>
                    </div>
                </div>

                <div class="mpo-modal-nav">
                    <label for="modal-content-1" class="prev-slide" style="display: none;">&#8249;</label>
                    <label for="modal-content-2" class="next-slide">&#8250;</label>
                </div>

                <div class="slide-indicators">
                    <label for="modal-content-1" class="slide-indicator indicator-1"></label>
                    <label for="modal-content-2" class="slide-indicator indicator-2"></label>
                    <label for="modal-content-3" class="slide-indicator indicator-3"></label>
                </div>
            </div>
        `
    };

            // Function to initialize sliding modal functionality
            function initializeSlidingModal() {
        const radio1 = document.getElementById('modal-content-1');
        const radio2 = document.getElementById('modal-content-2');
        const radio3 = document.getElementById('modal-content-3');
        
        if (!radio1 || !radio2 || !radio3) return; // Exit if elements don't exist
        
        function updateNavigation() {
            const nav = document.querySelector('#modalProjectContent .mpo-modal-nav');
            if (!nav) return;
            
            const prevBtn = nav.querySelector('.prev-slide');
            const nextBtn = nav.querySelector('.next-slide');
            
            if (!prevBtn || !nextBtn) return;
            
            if (radio1.checked) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'inline-block';
                nextBtn.setAttribute('for', 'modal-content-2');
            } else if (radio2.checked) {
                prevBtn.style.display = 'inline-block';
                nextBtn.style.display = 'inline-block';
                prevBtn.setAttribute('for', 'modal-content-1');
                nextBtn.setAttribute('for', 'modal-content-3');
            } else if (radio3.checked) {
                prevBtn.style.display = 'inline-block';
                nextBtn.style.display = 'none';
                prevBtn.setAttribute('for', 'modal-content-2');
            }
        }
        
        radio1.addEventListener('change', updateNavigation);
        radio2.addEventListener('change', updateNavigation);
        radio3.addEventListener('change', updateNavigation);
        
        updateNavigation();
    }

    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const projectKey = button.getAttribute('data-project');
            modalContent.innerHTML = projectData[projectKey];
            modal.style.display = 'block';
            
            // Initialize sliding modal if it's the viridis project
            if (projectKey === 'viridis') {
                setTimeout(initializeSlidingModal, 100); // Small delay to ensure DOM is updated
            }
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