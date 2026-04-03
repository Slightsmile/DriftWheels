function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
}

window.onload = function() {
    var name = getQueryParam('name');
    var price = getQueryParam('price');
    var year = getQueryParam('year');
    var condition = getQueryParam('condition');
    var mileage = getQueryParam('mileage');
    var fuel = getQueryParam('fuel');
    var transmission = getQueryParam('transmission');
    var color = getQueryParam('color');
    var location = getQueryParam('location');
    var description = getQueryParam('description');

    if (name) document.getElementById('car-title').textContent = name;
    if (price) document.getElementById('car-price').textContent = '৳ ' + price;
    if (year) document.getElementById('car-year').textContent = year;
    if (condition) document.getElementById('car-condition').textContent = condition;
    if (mileage) document.getElementById('car-mileage').textContent = mileage;
    if (fuel) document.getElementById('car-fuel').textContent = fuel;
    if (transmission) document.getElementById('car-transmission').textContent = transmission;
    if (color) document.getElementById('car-color').textContent = color;
    if (location) document.getElementById('car-location').textContent = location;
    if (description) document.getElementById('car-description').textContent = description;
};
