
function goToCarDetails(car) {
    var params = [];
    for (var key in car) {
        if (car.hasOwnProperty(key)) {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(car[key]));
        }
    }
    var url = 'car-details.html?' + params.join('&');
    window.location.href = url;
}
