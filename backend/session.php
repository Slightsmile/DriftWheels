<?php
require_once "common.php";

$user = current_user();
if ($user === null) {
    $admin = current_admin();
    if ($admin === null) {
        json_response(true, "No active session", ["loggedIn" => false]);
    }

    json_response(true, "Active admin session found", [
        "loggedIn" => true,
        "adminLoggedIn" => true,
        "user" => null,
        "admin" => $admin
    ]);
}

json_response(true, "Active session found", [
    "loggedIn" => true,
    "adminLoggedIn" => false,
    "user" => $user,
    "admin" => null
]);
