<?php
require_once "common.php";
require_method("POST");

$email = clean_text($_POST["email"] ?? "");
$password = (string)($_POST["password"] ?? "");

if ($email === "" || $password === "") {
    json_response(false, "Email and password are required", null, 400);
}

$sql = "SELECT u.id, u.full_name, u.email, u.phone, p.user_location, u.password_hash
    FROM users u
    LEFT JOIN profiles p ON p.user_id = u.id
    WHERE u.email = ?
    LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$userRow = $result->fetch_assoc();

if (!$userRow || !password_verify($password, $userRow["password_hash"])) {
    json_response(false, "Wrong email or password", null, 401);
}

$_SESSION["user"] = [
    "id" => (int)$userRow["id"],
    "full_name" => $userRow["full_name"],
    "email" => $userRow["email"],
    "phone" => $userRow["phone"],
    "user_location" => $userRow["user_location"]
];

json_response(true, "Login successful", ["user" => $_SESSION["user"]]);
