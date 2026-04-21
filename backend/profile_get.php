<?php
require_once "common.php";
$user = require_login();

$sql = "SELECT u.id, u.full_name, u.email, u.phone, p.user_location, p.address, p.bio, p.profile_image
    FROM users u
    LEFT JOIN profiles p ON p.user_id = u.id
    WHERE u.id = ?
    LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user["id"]);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if (!$row) {
    json_response(false, "User profile not found", null, 404);
}

json_response(true, "Profile loaded", ["profile" => $row]);
