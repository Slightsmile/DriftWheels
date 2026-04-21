<?php
require_once "common.php";
require_method("POST");

require_admin();

$id = (int)($_POST["id"] ?? 0);
if ($id <= 0) {
    json_response(false, "Invalid listing id", null, 400);
}

$deleteStmt = $conn->prepare("DELETE FROM listings WHERE id = ?");
$deleteStmt->bind_param("i", $id);

if (!$deleteStmt->execute()) {
    json_response(false, "Could not remove listing", null, 500);
}

if ($deleteStmt->affected_rows === 0) {
    json_response(false, "Listing not found", null, 404);
}

json_response(true, "Listing removed successfully", ["id" => $id]);