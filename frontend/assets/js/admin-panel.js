"use strict";

var PENDING_CARS_KEY = "pendingCars";
var APPROVED_CARS_KEY = "approvedCars";
var ADMIN_LOGIN_KEY = "adminLoggedIn";
var DEFAULT_IMAGE = "https://via.placeholder.com/600x400?text=No+Image";

var pendingCardsElement = document.getElementById("pendingCards");
var pendingCountElement = document.getElementById("pendingCount");
var adminLogoutBtn = document.getElementById("adminLogoutBtn");

function readCarsFromStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || "[]");
    } catch (error) {
        return [];
    }
}

function writeCarsToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
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
    image.src = car.photos && car.photos[0] ? car.photos[0] : DEFAULT_IMAGE;

    var topSection = document.createElement("div");
    topSection.className = "post-top";

    var title = document.createElement("h2");
    title.className = "post-title";
    title.textContent = car.name || "Untitled";

    var price = document.createElement("div");
    price.className = "price";
    price.textContent = "BDT " + (car.price || "0");

    topSection.appendChild(title);
    topSection.appendChild(price);

    var meta = document.createElement("div");
    meta.className = "meta";

    var chips = [
        car.year,
        car.condition,
        (car.mileage || "0") + " km",
        car.fuel,
        car.transmission,
        car.color,
        car.location
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
    postedBy.textContent = "Posted by: " + (car.user || "Unknown") + " (" + (car.phone || "No phone") + ")";

    footer.appendChild(postedBy);

    var actionBar = document.createElement("div");
    actionBar.className = "admin-action-row";

    var approveButton = document.createElement("button");
    approveButton.type = "button";
    approveButton.className = "admin-approve-btn";
    approveButton.textContent = "Approve";
    approveButton.addEventListener("click", function () {
        approveCar(index);
    });

    actionBar.appendChild(approveButton);

    card.appendChild(image);
    card.appendChild(topSection);
    card.appendChild(meta);
    card.appendChild(description);
    card.appendChild(footer);
    card.appendChild(actionBar);

    return card;
}

function renderEmptyState() {
    if (!pendingCardsElement) {
        return;
    }

    pendingCardsElement.innerHTML = '<article class="empty-state"><p>No pending posts right now.</p><a class="empty-link" href="sell-car.php">Go to sell car page</a></article>';
}

function updatePendingCount(count) {
    if (!pendingCountElement) {
        return;
    }

    if (count === 0) {
        pendingCountElement.textContent = "0 pending posts";
        return;
    }

    pendingCountElement.textContent = count + " pending post" + (count > 1 ? "s" : "");
}

function renderPendingCars() {
    var pendingCars = readCarsFromStorage(PENDING_CARS_KEY);

    updatePendingCount(pendingCars.length);

    if (!pendingCardsElement) {
        return;
    }

    pendingCardsElement.innerHTML = "";

    if (pendingCars.length === 0) {
        renderEmptyState();
        return;
    }

    for (var i = 0; i < pendingCars.length; i++) {
        pendingCardsElement.appendChild(buildPostCard(pendingCars[i], i));
    }
}

function approveCar(index) {
    var pendingCars = readCarsFromStorage(PENDING_CARS_KEY);
    var approvedCars = readCarsFromStorage(APPROVED_CARS_KEY);

    if (index < 0 || index >= pendingCars.length) {
        return;
    }

    approvedCars.push(pendingCars[index]);
    pendingCars.splice(index, 1);

    writeCarsToStorage(APPROVED_CARS_KEY, approvedCars);
    writeCarsToStorage(PENDING_CARS_KEY, pendingCars);

    renderPendingCars();
}

function ensureAdminAccess() {
    var isAdminLoggedIn = localStorage.getItem(ADMIN_LOGIN_KEY) === "yes";
    if (!isAdminLoggedIn) {
        window.location.href = "admin.php";
        return false;
    }
    return true;
}

function logoutAdmin() {
    localStorage.removeItem(ADMIN_LOGIN_KEY);
    window.location.href = "admin.php";
}

if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener("click", logoutAdmin);
}

if (ensureAdminAccess()) {
    renderPendingCars();
}
