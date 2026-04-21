<?php
require_once "common.php";
require_method("POST");

$name = clean_text($_POST["name"] ?? "");
$email = clean_text($_POST["email"] ?? "");
$subject = clean_text($_POST["subject"] ?? "");
$message = clean_text($_POST["message"] ?? "");

if ($name === "" || $email === "" || $subject === "" || $message === "") {
    json_response(false, "Please fill all fields", null, 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(false, "Invalid email address", null, 400);
}

$sql = "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $subject, $message);

if (!$stmt->execute()) {
    json_response(false, "Could not send message", null, 500);
}

json_response(true, "Message sent successfully");
