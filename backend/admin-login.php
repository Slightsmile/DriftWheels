<?php
require_once "common.php";
require_method("POST");

$username = clean_text($_POST["username"] ?? "");
$password = (string)($_POST["password"] ?? "");

if ($username === "" || $password === "") {
    json_response(false, "Username and password are required", null, 400);
}

$adminUsername = "admin";
$adminPassword = "admin123";

if ($username !== $adminUsername || $password !== $adminPassword) {
    json_response(false, "Invalid admin credentials", null, 401);
}

$_SESSION["admin"] = [
    "username" => $adminUsername
];

json_response(true, "Admin login successful", ["admin" => $_SESSION["admin"]]);