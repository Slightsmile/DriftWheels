var sellCarForm = document.getElementById("sellCarForm");
var errorMessage = document.getElementById("error-message");

var carTitleInput = document.getElementById("carTitle");
var carPriceInput = document.getElementById("carPrice");
var modelYearInput = document.getElementById("modelYear");
var carConditionInput = document.getElementById("carCondition");
var carMileageInput = document.getElementById("carMileage");
var fuelTypeInput = document.getElementById("fuelType");
var transmissionInput = document.getElementById("transmission");
var carColorInput = document.getElementById("carColor");
var carLocationInput = document.getElementById("carLocation");
var carDescriptionInput = document.getElementById("carDescription");
var sellerNameInput = document.getElementById("sellerName");
var sellerPhoneInput = document.getElementById("sellerPhone");

function showSellError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

function clearSellError() {
    if (errorMessage) {
        errorMessage.textContent = "";
    }
}

function loadCurrentUserIntoForm() {
    fetch("../backend/session.php")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data.ok || !data.data || !data.data.loggedIn) {
                return;
            }

            var user = data.data.user;

            if (sellerNameInput && sellerNameInput.value.trim() === "") {
                sellerNameInput.value = user.full_name || "";
            }

            if (sellerPhoneInput && sellerPhoneInput.value.trim() === "") {
                sellerPhoneInput.value = user.phone || "";
            }
        })
        .catch(function () {
            // Keep form usable even if session check fails.
        });
}

function addPhotosToFormData(formData) {
    var totalPhotos = 0;

    for (var photoNumber = 1; photoNumber <= 10; photoNumber++) {
        var photoInput = document.getElementById("photo" + photoNumber);
        if (photoInput && photoInput.files && photoInput.files[0]) {
            formData.append("photo" + photoNumber, photoInput.files[0]);
            totalPhotos = totalPhotos + 1;
        }
    }

    return totalPhotos;
}

function validateRequiredFields() {
    if (!carTitleInput || carTitleInput.value.trim() === "") {
        return "Please enter car title";
    }
    if (!carPriceInput || carPriceInput.value.trim() === "") {
        return "Please enter price";
    }
    if (!modelYearInput || modelYearInput.value.trim() === "") {
        return "Please enter model year";
    }
    if (!carConditionInput || carConditionInput.value === "") {
        return "Please select condition";
    }
    if (!fuelTypeInput || fuelTypeInput.value === "") {
        return "Please select fuel type";
    }
    if (!transmissionInput || transmissionInput.value === "") {
        return "Please select transmission";
    }
    if (!carLocationInput || carLocationInput.value.trim() === "") {
        return "Please enter location";
    }

    return "";
}

if (sellCarForm) {
    loadCurrentUserIntoForm();

    sellCarForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearSellError();

        var validationError = validateRequiredFields();
        if (validationError !== "") {
            showSellError(validationError);
            return;
        }

        var formData = new FormData();
        formData.append("car_title", carTitleInput.value.trim());
        formData.append("price", carPriceInput.value.trim());
        formData.append("model_year", modelYearInput.value.trim());
        formData.append("car_condition", carConditionInput.value);
        formData.append("mileage", carMileageInput ? carMileageInput.value.trim() : "");
        formData.append("fuel_type", fuelTypeInput.value);
        formData.append("transmission", transmissionInput.value);
        formData.append("color", carColorInput ? carColorInput.value.trim() : "");
        formData.append("car_location", carLocationInput.value.trim());
        formData.append("description", carDescriptionInput ? carDescriptionInput.value.trim() : "");
        formData.append("seller_name", sellerNameInput ? sellerNameInput.value.trim() : "");
        formData.append("seller_phone", sellerPhoneInput ? sellerPhoneInput.value.trim() : "");

        var photoCount = addPhotosToFormData(formData);
        if (photoCount === 0) {
            showSellError("Please upload at least one photo");
            return;
        }

        fetch("../backend/sell_car.php", {
            method: "POST",
            body: formData
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                alert(data.message);
                if (data.ok) {
                    window.location.href = "timeline.php";
                }
            })
            .catch(function () {
                showSellError("Could not submit listing");
            });
    });
}
