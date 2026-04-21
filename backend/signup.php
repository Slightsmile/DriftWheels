<?php
require_once "common.php";
require_method("POST");

$fullName = clean_text($_POST["full_name"] ?? "");
$email = clean_text($_POST["email"] ?? "");
$phone = clean_text($_POST["phone"] ?? "");
$password = (string)($_POST["password"] ?? "");
$location = clean_text($_POST["location"] ?? "");

if ($fullName === "" || $email === "" || $phone === "" || $password === "") {
    json_response(false, "Please fill all required fields", null, 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(false, "Invalid email address", null, 400);
}

if (strlen($password) < 8) {
    json_response(false, "Password must be at least 8 characters", null, 400);
}

$checkSql = "SELECT id FROM users WHERE email = ? LIMIT 1";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    json_response(false, "Email already exists", null, 409);
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (full_name, email, phone, password_hash) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $fullName, $email, $phone, $passwordHash);

if (!$stmt->execute()) {
    json_response(false, "Signup failed", null, 500);
}

$newUserId = (int)$stmt->insert_id;
$profileSql = "INSERT INTO profiles (user_id, user_location) VALUES (?, ?)";
$profileStmt = $conn->prepare($profileSql);
$profileStmt->bind_param("is", $newUserId, $location);
$profileStmt->execute();

json_response(true, "Signup successful");
