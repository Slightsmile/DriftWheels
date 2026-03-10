const contactForm = document.getElementById('contactForm');
const contactError = document.getElementById('contactError');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        if (contactError) {
            contactError.textContent = '';
            contactError.style.display = 'none';
        }
        const fields = contactForm.querySelectorAll('input, textarea');
        let filled = true;
        for (const field of fields) {
            if (!field.value.trim()) {
                filled = false;
                break;
            }
        }
        if (!filled) {
            event.preventDefault();
            if (contactError) {
                contactError.textContent = 'Please fill up all the fields before sending.';
                contactError.style.display = 'block';
            }
        }
    });
}
