<?php
require_once "common.php";

$user = current_user();
if ($user === null) {
    json_response(true, "No active session", ["loggedIn" => false]);
}

json_response(true, "Active session found", [
    "loggedIn" => true,
    "user" => $user
]);
