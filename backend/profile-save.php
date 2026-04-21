<?php
require_once "common.php";
require_method("POST");
$user = require_login();

$fullName = clean_text($_POST["full_name"] ?? "");
$phone = clean_text($_POST["phone"] ?? "");
$location = clean_text($_POST["location"] ?? "");
$address = clean_text($_POST["address"] ?? "");
$bio = clean_text($_POST["bio"] ?? "");

if ($fullName === "" || $phone === "") {
    json_response(false, "Name and phone are required", null, 400);
}

$profileImage = save_uploaded_image("profile_image", __DIR__ . "/../uploads/profiles");

$sql = "UPDATE users SET full_name = ?, phone = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $fullName, $phone, $user["id"]);

if (!$stmt->execute()) {
    json_response(false, "Could not save profile", null, 500);
}

$checkSql = "SELECT user_id FROM profiles WHERE user_id = ? LIMIT 1";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("i", $user["id"]);
$checkStmt->execute();
$exists = $checkStmt->get_result()->num_rows > 0;

if ($exists) {
    if ($profileImage === null) {
        $profileSql = "UPDATE profiles SET user_location = ?, address = ?, bio = ? WHERE user_id = ?";
        $profileStmt = $conn->prepare($profileSql);
        $profileStmt->bind_param("sssi", $location, $address, $bio, $user["id"]);
    } else {
        $profileSql = "UPDATE profiles SET user_location = ?, address = ?, bio = ?, profile_image = ? WHERE user_id = ?";
        $profileStmt = $conn->prepare($profileSql);
        $profileStmt->bind_param("ssssi", $location, $address, $bio, $profileImage, $user["id"]);
    }
} else {
    if ($profileImage === null) {
        $profileSql = "INSERT INTO profiles (user_id, user_location, address, bio) VALUES (?, ?, ?, ?)";
        $profileStmt = $conn->prepare($profileSql);
        $profileStmt->bind_param("isss", $user["id"], $location, $address, $bio);
    } else {
        $profileSql = "INSERT INTO profiles (user_id, user_location, address, bio, profile_image) VALUES (?, ?, ?, ?, ?)";
        $profileStmt = $conn->prepare($profileSql);
        $profileStmt->bind_param("issss", $user["id"], $location, $address, $bio, $profileImage);
    }
}

if (!$profileStmt->execute()) {
    json_response(false, "Could not save profile", null, 500);
}

$_SESSION["user"]["full_name"] = $fullName;
$_SESSION["user"]["phone"] = $phone;
$_SESSION["user"]["user_location"] = $location;

json_response(true, "Profile updated");
