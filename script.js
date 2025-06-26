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
            <!-- Radio buttons MUST be outside and siblings of the container -->
            <input type="radio" name="content-nav" id="modal-content-1" class="modal-radio" checked hidden/>
            <input type="radio" name="content-nav" id="modal-content-2" class="modal-radio" hidden/>
            <input type="radio" name="content-nav" id="modal-content-3" class="modal-radio" hidden/>

            <div class="mpo-modal-content-container">
                <div class="mpo-modal-slide content-1">
                    <div class="mpo-modal-content">
                        <h2>Garden Planner - Overview</h2>
                        <p>
                            The Garden Planning Tool is an intuitive application that applies L-system rules to generate dynamic and evolving garden layouts. The tool simulates plant growth and seasonal changes, offering users a sustainable and visually engaging planning experience.
                        </p>
                        <p>
                            By using this tool, users can explore realistic garden evolutions and plan environmentally conscious green spaces.
                        </p>
                        <div class="feature-grid">
                            <div class="feature-item">
                                <h4>🌱 Dynamic Growth</h4>
                                <p>Procedural plant generation using L-systems</p>
                            </div>
                            <div class="feature-item">
                                <h4>🗓️ Seasonal Changes</h4>
                                <p>Visual garden evolution over time</p>
                            </div>
                            <div class="feature-item">
                                <h4>🖥️ Visual Interface</h4>
                                <p>Interactive and user-friendly garden planning</p>
                            </div>
                            <div class="feature-item">
                                <h4>♻️ Sustainability Focus</h4>
                                <p>Promotes eco-conscious garden design</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mpo-modal-slide content-2">
                    <div class="mpo-modal-content">
                        <h2>Development Process</h2>
                        <div class="mpo-project-image">
                            <img src="img/gardenplanning.png" alt="Garden Planner Screenshot" />
                            <img src="img/growthrule.png" alt="Growth example 1st level" />
                            <img src="img/growthrule1.png" alt="Growth example 2nd level" />
                            <img src="img/growthrule2.png" alt="Growth example 3rd level" />
                        </div>
                        <p>
                            The Garden Planner was built using Python and Blender, leveraging L-system algorithms for procedural generation. Blender was used to visualize complex branching patterns and seasonal changes.
                        </p>
                        <div class="feature-grid">
                            <div class="feature-item">
                                <h4>Core Tools</h4>
                                <p>Python, Blender</p>
                            </div>
                            <div class="feature-item">
                                <h4>Techniques</h4>
                                <p>L-system rules, procedural modeling</p>
                            </div>
                            <div class="feature-item">
                                <h4>Features</h4>
                                <p>Seasonal adaptation, growth simulation</p>
                            </div>
                            <div class="feature-item">
                                <h4>Design</h4>
                                <p>Intuitive, visually dynamic interface</p>
                            </div>
                        </div>
                        <div class="tech-stack">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg" alt="Blender" />
                        </div>   
                    </div>
                </div>

                <div class="mpo-modal-slide content-3">
                    <div class="mpo-modal-content">
                        <h2>Impact & Future</h2>
                        <p>
                            The Garden Planning Tool offers an engaging, educational platform for sustainable garden design and plant growth simulation. It encourages users to visualise and adapt green spaces responsibly.
                        </p>
                        <div class="stats-row">
                            <div class="stat-item">
                                <span class="stat-number">100%</span>
                                <div class="stat-label">Customizable Gardens</div>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">Seasons</span>
                                <div class="stat-label">Dynamic Growth Cycles</div>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">Open Source</span>
                                <div class="stat-label">Collaborative Potential</div>
                            </div>
                        </div>
                        <p>
                            Future improvements include expanding plant libraries, adding real-time weather adaptation, and integrating garden layout exports for practical use.
                        </p>
                        <div class="project-links">
                            <a href="https://github.com/ZuhairaTech/garden-planner-lsystem.git" target="_blank">
                                View on GitHub <i class="fa-solid fa-arrow-right"></i>
                            </a>
                            <a href="http://3map.snu.ac.kr/courses/2012/cg/2-1-lsystems.pdf" target="_blank">
                                L-SYSTEMS: FROM THE THEORY TO VISUAL MODELS OF PLANTS <i class="fa-solid fa-arrow-right"></i>
                            </a>
                            <a href="https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2012.00076/full" target="_blank">
                                L-Py: an L-system simulation framework <i class="fa-solid fa-arrow-right"></i>
                            </a>
                            <a href="https://archive.org/details/the-algorithmic-beauty-of-plants" target="_blank">
                                The Algorithmic Beauty of Plants <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>

       
                    </div>
                </div>

                <div class="mpo-modal-nav">
                    <label for="modal-content-1" class="prev-slide" style="display: none;">&#10094;</label>
                    <label for="modal-content-2" class="next-slide">&#10095;</label>
                </div>

                <div class="slide-indicators">
                    <label for="modal-content-1" class="slide-indicator indicator-1"></label>
                    <label for="modal-content-2" class="slide-indicator indicator-2"></label>
                    <label for="modal-content-3" class="slide-indicator indicator-3"></label>
                </div>
            </div>
        `,

        hackcessible: `
            <!-- Radio buttons MUST be outside and siblings of the container -->
            <input type="radio" name="content-nav" id="modal-content-1" class="modal-radio" checked hidden/>
            <input type="radio" name="content-nav" id="modal-content-2" class="modal-radio" hidden/>
            <input type="radio" name="content-nav" id="modal-content-3" class="modal-radio" hidden/>

            <div class="mpo-modal-content-container">
                <div class="mpo-modal-slide content-1">
                    <div class="mpo-modal-content">
                        <h2>Hackcessible – Overview</h2>
                        <p>
                            The Accessible Drum System was developed as part of Hackcessible 2022, a disability innovation hackathon focused on inclusive design. The system is tailored for individuals with Duchenne Muscular Dystrophy (DMD), empowering them to actively participate in music education.
                        </p>
                        <p>
                            This award-winning project combines adaptive hardware and intuitive controls to ensure a meaningful and enjoyable drumming experience.
                        </p>
                        <div class="feature-grid">
                            <div class="feature-item">
                                <h4>🥁 Accessible Music</h4>
                                <p>Designed for users with limited mobility</p>
                            </div>
                            <div class="feature-item">
                                <h4>🤝 Collaborative Design</h4>
                                <p>Built with input from real users and specialists</p>
                            </div>
                            <div class="feature-item">
                                <h4>🔧 Custom Hardware</h4>
                                <p>Arduino-based responsive drum system</p>
                            </div>
                            <div class="feature-item">
                                <h4>🏆 Award-Winning</h4>
                                <p>Hackcessible 2022 Winning Project</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mpo-modal-slide content-2">
                    <div class="mpo-modal-content">
                        <h2>Development Process</h2>
                        <div class="mpo-project-image">
                            <img src="img/dmdhackcessible.jpg" alt="Garden Planner Screenshot" />
                            <img src="img/dmdhackcessible2.png" alt="Growth example 1st level" />
                        </div>
                        <p>
                            The drum system was prototyped using Arduino microcontrollers, programmed in C++ to ensure precise sensor input handling and responsive feedback. The design was user-focused, built with close collaboration between engineers, designers, and individuals living with DMD.
                        </p>
                        <div class="feature-grid">
                            <div class="feature-item">
                                <h4>Core Technology</h4>
                                <p>Arduino, C++</p>
                            </div>
                            <div class="feature-item">
                                <h4>Prototyping</h4>
                                <p>Basic hardware iteration and testing</p>
                            </div>
                            <div class="feature-item">
                                <h4>User Testing</h4>
                                <p>Inclusive feedback-driven design</p>
                            </div>
                            <div class="feature-item">
                                <h4>Outcome</h4>
                                <p>First prototype accessible drum system</p>
                            </div>
                        </div>
                        <div class="tech-stack">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg" alt="Arduino" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" alt="C++" />
                        </div> 
                    </div>
                </div>

                <div class="mpo-modal-slide content-3">
                    <div class="mpo-modal-content">
                        <h2>Impact & Future</h2>
                        <p>
                            The Accessible Drum System has opened new opportunities for individuals with DMD to engage with music, enhancing inclusion in creative spaces. The project highlights the importance of accessible design in education and recreational activities.
                        </p>
                        <div class="stats-row">
                            <div class="stat-item">
                                <span class="stat-number">Hackcessible</span>
                                <div class="stat-label">2022 Winner</div>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">100%</span>
                                <div class="stat-label">User-Centric Design</div>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">Real Impact</span>
                                <div class="stat-label">Inclusive Music Education</div>
                            </div>
                        </div>
                        <p>
                            Future development could explore wireless functionality, sound customisation, and integration with digital music platforms to further increase accessibility.
                        </p>
                        <div class="project-links">
                            <a href="https://www.linkedin.com/company/hackcessible/posts/?feedView=all" target="_blank">Hackcessible <i class="fa-solid fa-arrow-right"></i></a></div>
                        </div>
                </div>

                <div class="mpo-modal-nav">
                    <label for="modal-content-1" class="prev-slide" style="display: none;">&#10094;</label>
                    <label for="modal-content-2" class="next-slide">&#10095;</label>
                </div>

                <div class="slide-indicators">
                    <label for="modal-content-1" class="slide-indicator indicator-1"></label>
                    <label for="modal-content-2" class="slide-indicator indicator-2"></label>
                    <label for="modal-content-3" class="slide-indicator indicator-3"></label>
                </div>
            </div>
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
                            Viridis is a robust System Analysis and Reporting Platform designed to assess renewable energy systems for corporate applications. It supports data-driven strategies and informed decision-making in sustainability efforts.
                        </p>
                        <p>
                            The platform streamlines system evaluation and enhances reporting accuracy through an intuitive interface and powerful backend architecture.
                        </p>
                        <div class="feature-grid">
                            <div class="feature-item">
                                <h4>🔒 Secure Authentication</h4>
                                <p>Protected access for corporate users</p>
                            </div>
                            <div class="feature-item">
                                <h4>📊 Dynamic Reporting</h4>
                                <p>Customised renewable energy assessments</p>
                            </div>
                            <div class="feature-item">
                                <h4>⚙️ Admin Interface</h4>
                                <p>Manage users and reports efficiently</p>
                            </div>
                            <div class="feature-item">
                                <h4>🗂️ Database Integration</h4>
                                <p>Reliable and structured data storage</p>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="mpo-modal-slide content-2">
                    <div class="mpo-modal-content">
                        <h2>Development Process</h2>
                       
                        <p>
                            Viridis was developed using Ruby on Rails for backend efficiency and SQL for structured data management. The user interface was built with HTML and CSS to ensure a clean, responsive experience.
                        </p>
                        <div class="feature-grid">
                            <div class="feature-item">
                                <h4>Backend</h4>
                                <p>Ruby on Rails, SQL</p>
                            </div>
                            <div class="feature-item">
                                <h4>Frontend</h4>
                                <p>HTML, CSS</p>
                            </div>
                            <div class="feature-item">
                                <h4>Features</h4>
                                <p>Secure login, admin controls, dynamic reports</p>
                            </div>
                            <div class="feature-item">
                                <h4>Design</h4>
                                <p>User-centric and scalable layout</p>
                            </div>
                        </div>
                        <div class="tech-stack">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/Ruby_On_Rails_Logo.svg" alt="Ruby on Rails" />
                            <img src="https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg" alt="MySQL" />
                        </div>
                    </div>
                </div>

                <div class="mpo-modal-slide content-3">
                    <div class="mpo-modal-content">
                        <h2>Impact & Future</h2>
                        <p>
                            Viridis has significantly improved the ability of corporate users to assess and optimise their renewable energy systems, driving sustainability efforts with accurate and actionable reports.
                        </p>
                        <div class="stats-row">
                            <div class="stat-item">
                                <span class="stat-number">100%</span>
                                <div class="stat-label">Secure Access</div>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">High</span>
                                <div class="stat-label">Reporting Accuracy</div>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">Scalable</span>
                                <div class="stat-label">Corporate Integration</div>
                            </div>
                        </div>
                        <p>
                            Future enhancements will focus on integrating real-time system monitoring, advanced analytics, and interactive visual dashboards to further support strategic decision-making.
                        </p>
                        <div class="project-links">
                            <a href="https://canrenewables.com/" target="_blank">CAN Renewables<i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>

                <div class="mpo-modal-nav">
                    <label for="modal-content-1" class="prev-slide" style="display: none;">&#10094;</label>
                    <label for="modal-content-2" class="next-slide">&#10095;</label>
                </div>

                <div class="slide-indicators">
                    <label for="modal-content-1" class="slide-indicator indicator-1"></label>
                    <label for="modal-content-2" class="slide-indicator indicator-2"></label>
                    <label for="modal-content-3" class="slide-indicator indicator-3"></label>
                </div>
            </div>
        `,
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
                    setTimeout(initializeSlidingModal, 100); // Small delay to ensure DOM is updated
                    
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