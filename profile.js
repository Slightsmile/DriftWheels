const profileForm = document.getElementById('profileForm');
const nameInput = document.getElementById('fullName');
const nameError = document.getElementById('nameError');
const phoneInput = document.getElementById('phoneNumber');
const phoneError = document.getElementById('phoneError');
const imageInput = document.getElementById('imageUpload');
const imageError = document.getElementById('imageError');

function setError(target, message) {
    if (!target) {
        return;
    }
    if (message) {
        target.textContent = message;
        target.style.display = 'block';
    } else {
        target.textContent = '';
        target.style.display = 'none';
    }
}

function validateName() {
    if (!nameInput) {
        return true;
    }
    const value = nameInput.value.trim();
    if (value.length < 3) {
        setError(nameError, 'Name must be at least 3 letters.');
        return false;
    }
    if (!/^[A-Za-z\s]+$/.test(value)) {
        setError(nameError, 'Only letters allowed.');
        return false;
    }
    setError(nameError, '');
    return true;
}

function formatPhone() {
    if (!phoneInput) {
        return true;
    }
    let value = phoneInput.value || '';
    value = value.replace(/\s+/g, '');
    value = value.replace(/[^0-9+]/g, '');
    if (value.startsWith('+880')) {
        value = value.slice(4);
    } else if (value.startsWith('880')) {
        value = value.slice(3);
    } else {
        value = value.replace(/[^0-9]/g, '');
    }
    value = value.replace(/[^0-9]/g, '');
    value = value.slice(0, 10);
    phoneInput.value = '+880' + value;
    if (value.length !== 10) {
        setError(phoneError, 'Add 10 digits after +880.');
        return false;
    }
    setError(phoneError, '');
    return true;
}

if (nameInput) {
    nameInput.addEventListener('input', validateName);
}

if (phoneInput) {
    phoneInput.addEventListener('focus', function () {
        if (!phoneInput.value) {
            phoneInput.value = '+880';
        }
    });
    phoneInput.addEventListener('input', formatPhone);
}

if (profileForm) {
    profileForm.addEventListener('submit', function (event) {
        let valid = true;
        if (!validateName()) {
            valid = false;
        }
        if (!formatPhone()) {
            valid = false;
        }
        if (!imageInput || imageInput.files.length === 0) {
            setError(imageError, 'Please upload an image.');
            valid = false;
        } else {
            setError(imageError, '');
        }
        if (!valid) {
            event.preventDefault();
        }
    });
}
