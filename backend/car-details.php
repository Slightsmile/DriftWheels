<?php
require_once "common.php";

$id = (int)($_GET["id"] ?? 0);
if ($id <= 0) {
    json_response(false, "Invalid listing id", null, 400);
}

$sql = "SELECT id, seller_name AS full_name, seller_phone AS phone, car_title, price, model_year, car_condition, mileage, fuel_type, transmission, color, car_location, description, created_at FROM listings WHERE id = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if (!$row) {
    json_response(false, "Listing not found", null, 404);
}

$photos = [];
$imgSql = "SELECT image_path FROM listing_images WHERE listing_id = ? ORDER BY sort_order ASC, id ASC";
$imgStmt = $conn->prepare($imgSql);
$imgStmt->bind_param("i", $id);
$imgStmt->execute();
$imgResult = $imgStmt->get_result();

while ($img = $imgResult->fetch_assoc()) {
    if (!empty($img["image_path"])) {
        $photos[] = $img["image_path"];
    }
}
$row["photos"] = $photos;

json_response(true, "Listing loaded", ["listing" => $row]);
