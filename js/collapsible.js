
    document.querySelectorAll('.writingsection button').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });

    // Optional: hide all sections on load
    document.querySelectorAll('.writingsection > div').forEach(div => {
        div.style.display = 'none';
    });
