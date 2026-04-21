<?php
require_once "common.php";
require_method("POST");

$user = require_login();

$carTitle = clean_text($_POST["car_title"] ?? "");
$price = (float)($_POST["price"] ?? 0);
$modelYear = (int)($_POST["model_year"] ?? 0);
$carCondition = clean_text($_POST["car_condition"] ?? "");
$mileage = (int)($_POST["mileage"] ?? 0);
$fuelType = clean_text($_POST["fuel_type"] ?? "");
$transmission = clean_text($_POST["transmission"] ?? "");
$color = clean_text($_POST["color"] ?? "");
$carLocation = clean_text($_POST["car_location"] ?? "");
$description = clean_text($_POST["description"] ?? "");
$sellerName = clean_text($_POST["seller_name"] ?? $user["full_name"]);
$sellerPhone = clean_text($_POST["seller_phone"] ?? $user["phone"]);

if ($carTitle === "" || $price <= 0 || $modelYear <= 0 || $carCondition === "" || $fuelType === "" || $transmission === "" || $carLocation === "") {
    json_response(false, "Please fill all required car fields", null, 400);
}

$photos = [];
for ($i = 1; $i <= 10; $i++) {
    $saved = save_uploaded_image("photo" . $i, __DIR__ . "/../uploads/cars");
    if ($saved !== null) {
        $photos[] = $saved;
    }
}

if (count($photos) === 0) {
    json_response(false, "Please upload at least one photo", null, 400);
}

$sql = "INSERT INTO listings (user_id, seller_name, seller_phone, car_title, price, model_year, car_condition, mileage, fuel_type, transmission, color, car_location, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "isssdisisssss",
    $user["id"],
    $sellerName,
    $sellerPhone,
    $carTitle,
    $price,
    $modelYear,
    $carCondition,
    $mileage,
    $fuelType,
    $transmission,
    $color,
    $carLocation,
    $description
);

if (!$stmt->execute()) {
    json_response(false, "Could not save listing", null, 500);
}

$listingId = (int)$stmt->insert_id;
$imgSql = "INSERT INTO listing_images (listing_id, image_path, sort_order) VALUES (?, ?, ?)";
$imgStmt = $conn->prepare($imgSql);

for ($i = 0; $i < count($photos); $i++) {
    $sortOrder = $i + 1;
    $imgPath = $photos[$i];
    $imgStmt->bind_param("isi", $listingId, $imgPath, $sortOrder);
    $imgStmt->execute();
}

json_response(true, "Listing posted successfully", ["listing_id" => $stmt->insert_id]);
