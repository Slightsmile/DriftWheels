function openDetails(id) {
    window.location.href = "car-details.php?id=" + encodeURIComponent(id);
}

function formatDate(value) {
    var dateObject = new Date(value);
    if (isNaN(dateObject.getTime())) {
        return "-";
    }
    return dateObject.toDateString();
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

function createCarBox(item) {
    var title = item.car_title || "Untitled";
    var price = item.price || "0";
    var year = item.model_year || "-";
    var condition = item.car_condition || "-";
    var mileage = item.mileage || "0";
    var fuelType = item.fuel_type || "-";
    var location = item.car_location || "-";
    var description = item.description || "No description";
    var sellerName = item.full_name || "-";
    var createdDate = formatDate(item.created_at);

    var imageUrl = "https://via.placeholder.com/600x400?text=No+Image";
    if (item.photos && item.photos.length > 0) {
        imageUrl = resolveImagePath(item.photos[0]);
    }

    return '<a class="post-link" href="car-details.php?id=' + encodeURIComponent(item.id) + '">' +
        '<article class="post-card">' +
        '<img class="post-image" src="' + imageUrl + '" alt="Car Image">' +
        '<div class="post-top">' +
        '<h2 class="post-title">' + title + '</h2>' +
        '<div class="price">BDT ' + price + '</div>' +
        '</div>' +
        '<div class="meta">' +
        '<span class="meta-item">' + year + '</span>' +
        '<span class="meta-item">' + condition + '</span>' +
        '<span class="meta-item">' + mileage + ' km</span>' +
        '<span class="meta-item">' + fuelType + '</span>' +
        '<span class="meta-item">' + location + '</span>' +
        '</div>' +
        '<p class="description">' + description + '</p>' +
        '<div class="post-footer">' +
        '<span>Seller: ' + sellerName + '</span>' +
        '<span>' + createdDate + '</span>' +
        '</div>' +
        '</article>' +
        '</a>';
}

function loadFeaturedCars() {
    var container = document.getElementById("featuredCars");
    if (!container) {
        return;
    }

    fetch("../backend/listings.php")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (!data.ok || !data.data || !data.data.listings || data.data.listings.length === 0) {
                container.innerHTML = "No cars posted yet.";
                return;
            }

            var topCars = data.data.listings.slice(0, 3);
            var html = "";
            for (var i = 0; i < topCars.length; i++) {
                html += createCarBox(topCars[i]);
            }
            container.innerHTML = html;

        })
        .catch(function () {
            container.innerHTML = "Could not load cars right now.";
        });
}

loadFeaturedCars();
