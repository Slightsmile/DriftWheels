function getListingId() {
    var params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function setText(id, value, prefix) {
    var element = document.getElementById(id);
    if (!element) {
        return;
    }
    if (value === null || value === undefined || value === "") {
        return;
    }
    element.textContent = (prefix || "") + value;
}

function resolveImagePath(path) {
    if (!path) {
        return "";
    }

    var safePath = String(path);
    var hasProtocol = safePath.indexOf("http://") === 0 || safePath.indexOf("https://") === 0;
    var isDataUrl = safePath.indexOf("data:") === 0;
    var isAbsolute = safePath.indexOf("/") === 0;
    var alreadyRelativeToRoot = safePath.indexOf("../") === 0;

    if (hasProtocol || isDataUrl || isAbsolute || alreadyRelativeToRoot) {
        return safePath;
    }

    return "../" + safePath;
}

function setSliderImages(photos) {
    if (!photos || photos.length === 0) {
        return;
    }
    var imgs = document.querySelectorAll(".slides .slide img");
    for (var i = 0; i < imgs.length; i++) {
        if (photos[i]) {
            imgs[i].src = resolveImagePath(photos[i]);
        }
    }
}

function loadCarDetails() {
    var id = getListingId();
    if (!id) {
        return;
    }

    fetch("../backend/car-details.php?id=" + encodeURIComponent(id))
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (!data.ok || !data.data || !data.data.listing) {
                alert("Could not load car details");
                return;
            }

            var item = data.data.listing;
            setText("car-title", item.car_title);
            setText("car-price", item.price, "৳ ");
            setText("car-year", item.model_year);
            setText("car-condition", item.car_condition);
            setText("car-mileage", item.mileage + " km");
            setText("car-fuel", item.fuel_type);
            setText("car-transmission", item.transmission);
            setText("car-color", item.color);
            setText("car-location", item.car_location);
            setText("car-description", item.description);
            setText("seller-name", item.full_name);
            setText("seller-phone", item.phone);

            setSliderImages(item.photos || []);
        })
        .catch(function () {
            alert("Could not load car details");
        });
}

loadCarDetails();
