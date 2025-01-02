const branch = document.getElementById("branch");

        let leafCount = 0; // Counter for the leaves

        // Add leaves dynamically as the user scrolls
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;

            // Add a new leaf if scrolled down enough
            if (scrollY > leafCount * 100) {
                const newLeaf = document.createElement("div");
                newLeaf.classList.add("leaf");
                newLeaf.style.top = `${scrollY}px`; // Position leaf on the branch

                // Apply alternating animations for odd and even leaves
                if (leafCount % 2 === 0) {
                    newLeaf.style.animation = "growLeafOdd 0.5s ease-out forwards";
                } else {
                    newLeaf.style.animation = "growLeafEven 0.5s ease-out forwards";
                }

                branch.appendChild(newLeaf);
                leafCount++;
            }
        });