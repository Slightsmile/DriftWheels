const contactForm = document.getElementById('contactForm');
const contactError = document.getElementById('contactError');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
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
            if (contactError) {
                contactError.textContent = 'Please fill up all the fields before sending.';
                contactError.style.display = 'block';
            }
            return;
        }

        var formData = new FormData(contactForm);
        fetch('../backend/contact.php', {
            method: 'POST',
            body: formData
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (contactError) {
                    contactError.textContent = data.message;
                    contactError.style.display = 'block';
                    contactError.style.color = data.ok ? 'green' : 'red';
                }
                if (data.ok) {
                    contactForm.reset();
                }
            })
            .catch(function () {
                if (contactError) {
                    contactError.textContent = 'Could not send message right now.';
                    contactError.style.display = 'block';
                }
            });
    });
}
