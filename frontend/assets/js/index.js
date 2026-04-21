function openDetails(id) {
    window.location.href = "car-details.php?id=" + encodeURIComponent(id);
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
    var imageHtml = "Car Image";
    if (item.photos && item.photos.length > 0) {
        imageHtml = '<img src="' + resolveImagePath(item.photos[0]) + '" alt="Car" style="width:100%;height:100%;object-fit:cover;">';
    }

    return '<div class="car-box">' +
        '<div class="image-box">' + imageHtml + '</div>' +
        '<div class="car-title">' + (item.car_title || "Untitled") + '</div>' +
        '<span class="price">৳ ' + (item.price || "0") + '</span>' +
        '<button class="view-btn" data-id="' + item.id + '">View Details</button>' +
        '</div>';
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

            var buttons = container.querySelectorAll(".view-btn");
            for (var j = 0; j < buttons.length; j++) {
                buttons[j].addEventListener("click", function () {
                    openDetails(this.getAttribute("data-id"));
                });
            }
        })
        .catch(function () {
            container.innerHTML = "Could not load cars right now.";
        });
}

loadFeaturedCars();
