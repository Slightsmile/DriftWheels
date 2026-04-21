"use strict";

var ADMIN_LOGIN_KEY = "adminLoggedIn";
var DEFAULT_IMAGE = "https://via.placeholder.com/600x400?text=No+Image";

var approvedCardsElement = document.getElementById("approvedCards");
var approvedCountElement = document.getElementById("approvedCount");

function resolveImagePath(path) {
    if (!path) {
        return DEFAULT_IMAGE;
    }

    var imagePath = String(path);
    var hasHttp = imagePath.indexOf("http://") === 0 || imagePath.indexOf("https://") === 0;
    var isDataUrl = imagePath.indexOf("data:") === 0;
    var isAbsolute = imagePath.indexOf("/") === 0;
    var alreadyRelative = imagePath.indexOf("../") === 0;

    if (hasHttp || isDataUrl || isAbsolute || alreadyRelative) {
        return imagePath;
    }

    return "../" + imagePath;
}

function buildMetaItem(label) {
    var item = document.createElement("span");
    item.className = "meta-item";
    item.textContent = label;
    return item;
}

function buildPostCard(car, index) {
    var card = document.createElement("article");
    card.className = "post-card";

    var image = document.createElement("img");
    image.className = "post-image";
    image.alt = "Car image";
    image.src = resolveImagePath(car.photos && car.photos[0] ? car.photos[0] : "");

    if (car.id) {
        card.dataset.listingId = String(car.id);
    }

    var topSection = document.createElement("div");
    topSection.className = "post-top";

    var title = document.createElement("h2");
    title.className = "post-title";
    title.textContent = car.name || car.car_title || "Untitled";

    var price = document.createElement("div");
    price.className = "price";
    price.textContent = "BDT " + (car.price || "0");

    topSection.appendChild(title);
    topSection.appendChild(price);

    var meta = document.createElement("div");
    meta.className = "meta";

    var chips = [
        car.year || car.model_year,
        car.condition || car.car_condition,
        (car.mileage || "0") + " km",
        car.fuel || car.fuel_type,
        car.transmission,
        car.color,
        car.location || car.car_location
    ];

    for (var i = 0; i < chips.length; i++) {
        if (chips[i]) {
            meta.appendChild(buildMetaItem(chips[i]));
        }
    }

    var description = document.createElement("p");
    description.className = "description";
    description.textContent = car.description || "No description";

    var footer = document.createElement("div");
    footer.className = "post-footer";

    var postedBy = document.createElement("span");
    postedBy.textContent = "Posted by: " + (car.user || car.full_name || "Unknown") + " (" + (car.phone || car.seller_phone || "No phone") + ")";

    footer.appendChild(postedBy);

    var actionBar = document.createElement("div");
    actionBar.className = "admin-action-row";

    var removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "admin-remove-btn";
    removeButton.textContent = "Delete";
    removeButton.addEventListener("click", function () {
        removeApprovedCar(index);
    });

    actionBar.appendChild(removeButton);

    card.appendChild(image);
    card.appendChild(topSection);
    card.appendChild(meta);
    card.appendChild(description);
    card.appendChild(footer);
    card.appendChild(actionBar);

    return card;
}

function renderApprovedEmptyState() {
    if (!approvedCardsElement) {
        return;
    }

    approvedCardsElement.innerHTML = '<article class="empty-state"><p>No available listings right now.</p></article>';
}

function updateApprovedCount(count) {
    if (!approvedCountElement) {
        return;
    }

    if (count === 0) {
        approvedCountElement.textContent = "0 available posts";
        return;
    }

    approvedCountElement.textContent = count + " available post" + (count > 1 ? "s" : "");
}

function renderApprovedCars() {
    if (!approvedCardsElement) {
        return;
    }

    approvedCardsElement.innerHTML = '<article class="empty-state"><p>Loading available listings...</p></article>';

    fetch("../backend/listings.php")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var listings = data && data.ok && data.data && data.data.listings ? data.data.listings : [];

            updateApprovedCount(listings.length);
            approvedCardsElement.innerHTML = "";

            if (listings.length === 0) {
                renderApprovedEmptyState();
                return;
            }

            for (var i = 0; i < listings.length; i++) {
                approvedCardsElement.appendChild(buildPostCard(listings[i], i));
            }
        })
        .catch(function () {
            updateApprovedCount(0);
            approvedCardsElement.innerHTML = '<article class="empty-state"><p>Could not load available listings right now.</p></article>';
        });
}

function removeApprovedCar(index) {
    var approvedCards = approvedCardsElement ? approvedCardsElement.querySelectorAll(".post-card") : [];
    var card = approvedCards[index];
    var listingId = card && card.dataset ? card.dataset.listingId : "";

    if (!listingId) {
        return;
    }

    if (!window.confirm("Remove this listing from available cars?")) {
        return;
    }

    fetch("../backend/admin-delete-listing.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "id=" + encodeURIComponent(listingId)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data || !data.ok) {
                alert((data && data.message) || "Could not remove listing");
                return;
            }

            renderApprovedCars();
        })
        .catch(function () {
            alert("Could not remove listing");
        });
}

function ensureAdminAccess() {
    var isAdminLoggedIn = localStorage.getItem(ADMIN_LOGIN_KEY) === "yes";
    if (!isAdminLoggedIn) {
        window.location.href = "admin.php";
        return false;
    }
    return true;
}

if (ensureAdminAccess()) {
    renderApprovedCars();
}
