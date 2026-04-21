"use strict";

function formatDate(value) {
	var dateObject = new Date(value);
	if (isNaN(dateObject.getTime())) {
		return "-";
	}
	return dateObject.toDateString();
}

function resolveImagePath(path) {
	if (!path) {
		return "https://via.placeholder.com/600x400?text=No+Image";
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

function buildCarCard(listing) {
	var title = listing.car_title || "Untitled";
	var price = listing.price || "0";
	var year = listing.model_year || "-";
	var condition = listing.car_condition || "-";
	var mileage = listing.mileage || "0";
	var fuelType = listing.fuel_type || "-";
	var location = listing.car_location || "-";
	var description = listing.description || "No description";
	var sellerName = listing.full_name || "-";
	var createdDate = formatDate(listing.created_at);

	var firstPhoto = "";
	if (listing.photos && listing.photos.length > 0) {
		firstPhoto = listing.photos[0];
	}

	var photoUrl = resolveImagePath(firstPhoto);

	return '<a class="post-link" href="car-details.php?id=' + encodeURIComponent(listing.id) + '">' +
		'<article class="post-card">' +
		'<img class="post-image" src="' + photoUrl + '" alt="Car Image">' +
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

function loadTimeline() {
	var timelineFeed = document.getElementById("timelineFeed");
	var postCountText = document.getElementById("postCount");

	if (!timelineFeed || !postCountText) {
		return;
	}

	fetch("../backend/listings.php")
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			if (!data.ok || !data.data || !data.data.listings) {
				postCountText.textContent = "0 cars found";
				timelineFeed.innerHTML = "No cars found.";
				return;
			}

			var listings = data.data.listings;
			postCountText.textContent = listings.length + " cars found";

			if (listings.length === 0) {
				timelineFeed.innerHTML = "No cars found.";
				return;
			}

			var allCardsHtml = "";
			for (var index = 0; index < listings.length; index++) {
				allCardsHtml += buildCarCard(listings[index]);
			}

			timelineFeed.innerHTML = allCardsHtml;
		})
		.catch(function () {
			postCountText.textContent = "0 cars found";
			timelineFeed.innerHTML = "Could not load cars right now.";
		});
}

loadTimeline();
