const profileForm = document.getElementById('profileForm');
const nameInput = document.getElementById('fullName');
const nameError = document.getElementById('nameError');
const phoneInput = document.getElementById('phoneNumber');
const phoneError = document.getElementById('phoneError');
const imageInput = document.getElementById('imageUpload');
const imageError = document.getElementById('imageError');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const bioInput = document.getElementById('bio');
const profileImage = document.getElementById('profileImage');

function resolveImagePath(path) {
    if (!path) {
        return '';
    }

    var safePath = String(path);
    var hasProtocol = safePath.indexOf('http://') === 0 || safePath.indexOf('https://') === 0;
    var isDataUrl = safePath.indexOf('data:') === 0;
    var isAbsolute = safePath.indexOf('/') === 0;
    var alreadyRelativeToRoot = safePath.indexOf('../') === 0;

    if (hasProtocol || isDataUrl || isAbsolute || alreadyRelativeToRoot) {
        return safePath;
    }

    return '../' + safePath;
}

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
    fetch('../backend/profile_get.php')
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (!data.ok || !data.data || !data.data.profile) {
                return;
            }
            const p = data.data.profile;
            if (nameInput) nameInput.value = p.full_name || '';
            if (emailInput) {
                emailInput.value = p.email || '';
                emailInput.readOnly = true;
            }
            if (phoneInput) phoneInput.value = p.phone || '+880';
            if (addressInput) addressInput.value = p.address || '';
            if (bioInput) bioInput.value = p.bio || '';
            if (profileImage && p.profile_image) profileImage.src = resolveImagePath(p.profile_image);
        })
        .catch(function () {
        });

    profileForm.addEventListener('submit', function (event) {
        let valid = true;
        if (!validateName()) {
            valid = false;
        }
        if (!formatPhone()) {
            valid = false;
        }
        if (imageInput && imageInput.files.length > 0) {
            setError(imageError, '');
        } else {
            setError(imageError, '');
        }
        if (!valid) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        const formData = new FormData();
        formData.append('full_name', nameInput ? nameInput.value.trim() : '');
        formData.append('phone', phoneInput ? phoneInput.value.trim() : '');
        formData.append('location', '');
        formData.append('address', addressInput ? addressInput.value.trim() : '');
        formData.append('bio', bioInput ? bioInput.value.trim() : '');
        if (imageInput && imageInput.files.length > 0) {
            formData.append('profile_image', imageInput.files[0]);
        }

        fetch('../backend/profile_save.php', {
            method: 'POST',
            body: formData
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                alert(data.message);
                if (data.ok && imageInput && imageInput.files.length > 0) {
                    profileImage.src = URL.createObjectURL(imageInput.files[0]);
                }
            })
            .catch(function () {
                alert('Could not save profile right now.');
            });
    });
}
