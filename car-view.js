function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

window.addEventListener('DOMContentLoaded', () => {
    const name = getQueryParam('name') || 'Unknown car';
    const price = getQueryParam('price');

    document.getElementById('car-name').textContent = name;

    if (price) {
        document.getElementById('car-price').textContent = 'Price: ৳ ' + price;
    } else {
        document.getElementById('car-price').textContent = 'Price not available';
    }
});