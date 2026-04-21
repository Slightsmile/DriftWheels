document.querySelector('.sell-car-form').onsubmit = function(e) {
    var fields = document.querySelectorAll('.sell-car-form .input-field');
    var errors = document.querySelectorAll('.field-error');
    for(var i=0;i<errors.length;i++) errors[i].textContent = '';
    var error = '';
    if(fields[0].value.trim() === '') { errors[0].textContent = 'Car Title is required'; error = '1'; }
    if(fields[1].value.trim() === '' || isNaN(fields[1].value) || Number(fields[1].value) <= 0) { errors[1].textContent = 'Valid Price is required'; error = '1'; }
    if(fields[2].value.trim() === '' || isNaN(fields[2].value) || fields[2].value.length !== 4) { errors[2].textContent = 'Valid Model Year is required'; error = '1'; }
    if(fields[3].value === '') { errors[3].textContent = 'Condition is required'; error = '1'; }
    if(fields[4].value.trim() === '' || isNaN(fields[4].value) || Number(fields[4].value) < 0) { errors[4].textContent = 'Valid Mileage is required'; error = '1'; }
    if(fields[5].value === '') { errors[5].textContent = 'Fuel Type is required'; error = '1'; }
    if(fields[6].value === '') { errors[6].textContent = 'Transmission is required'; error = '1'; }
    if(fields[7].value.trim() === '') { errors[7].textContent = 'Color is required'; error = '1'; }
    if(fields[8].value.trim() === '') { errors[8].textContent = 'Location is required'; error = '1'; }
    if(fields[9].value.trim().length < 10) { errors[9].textContent = 'Description must be at least 10 characters'; error = '1'; }
    var name = fields[10].value.trim();
    var phone = fields[11].value.trim();
    if(name === '') { errors[10].textContent = 'Your Name is required'; error = '1'; }
    if(phone === '' || !/^\+?\d{10,15}$/.test(phone)) { errors[11].textContent = 'Valid Phone Number is required'; error = '1'; }
    var files = document.querySelectorAll('.photo-upload-item input[type="file"]');
    var photoCount = 0;
    var photoData = [];
    var filesToRead = 0;
    for(var i=0;i<files.length;i++) {
        if(files[i].files.length) {
            photoCount++;
            filesToRead++;
        }
    }
    if(photoCount === 0) {
        document.getElementById('error-message').textContent = 'At least 1 photo is required';
        error = '1';
    } else {
        document.getElementById('error-message').textContent = '';
    }
    if(error) {
        e.preventDefault();
        return false;
    }
    function saveCar() {
        var car = {
            name: fields[0].value,
            price: fields[1].value,
            year: fields[2].value,
            condition: fields[3].value,
            mileage: fields[4].value,
            fuel: fields[5].value,
            transmission: fields[6].value,
            color: fields[7].value,
            location: fields[8].value,
            description: fields[9].value,
            user: name,
            phone: phone,
            photos: photoData
        };
        var pendingCars = JSON.parse(localStorage.getItem('pendingCars') || '[]');
        pendingCars.push(car);
        localStorage.setItem('pendingCars', JSON.stringify(pendingCars));
        alert('Your car post is submitted for admin approval.');
        window.location = 'index.html';
    }
    if(filesToRead === 0) {
        saveCar();
        return false;
    }
    var readCount = 0;
    for(var i=0;i<files.length;i++) {
        if(files[i].files.length) {
            var reader = new FileReader();
            reader.onload = function(e) {
                photoData.push(e.target.result);
                readCount++;
                if(readCount === filesToRead) saveCar();
            };
            reader.readAsDataURL(files[i].files[0]);
        }
    }
    e.preventDefault();
    return false;
};