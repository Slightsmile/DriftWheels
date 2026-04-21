<?php
require_once "common.php";

$sql = "SELECT id, seller_name AS full_name, seller_phone AS phone, car_title, price, model_year, car_condition, mileage, fuel_type, transmission, color, car_location, description, created_at FROM listings ORDER BY id DESC";
$result = $conn->query($sql);

$listings = [];
while ($row = $result->fetch_assoc()) {
    $photos = [];
    $imgSql = "SELECT image_path FROM listing_images WHERE listing_id = ? ORDER BY sort_order ASC, id ASC";
    $imgStmt = $conn->prepare($imgSql);
    $imgStmt->bind_param("i", $row["id"]);
    $imgStmt->execute();
    $imgResult = $imgStmt->get_result();

    while ($img = $imgResult->fetch_assoc()) {
        if (!empty($img["image_path"])) {
            $photos[] = $img["image_path"];
        }
    }

    $row["photos"] = $photos;
    $listings[] = $row;
}

json_response(true, "Listings loaded", ["listings" => $listings]);
