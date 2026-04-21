<?php
session_start();
header("Content-Type: application/json");

require_once "db.php";

function json_response($ok, $message, $data = null, $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode([
        "ok" => $ok,
        "message" => $message,
        "data" => $data
    ]);
    exit;
}

function require_method($method)
{
    if ($_SERVER["REQUEST_METHOD"] !== $method) {
        json_response(false, "Invalid request method", null, 405);
    }
}

function clean_text($value)
{
    return trim((string)$value);
}

function current_user()
{
    if (!isset($_SESSION["user"])) {
        return null;
    }
    return $_SESSION["user"];
}

function require_login()
{
    $user = current_user();
    if ($user === null) {
        json_response(false, "Please login first", null, 401);
    }
    return $user;
}

function save_uploaded_image($fieldName, $folder)
{
    if (!isset($_FILES[$fieldName])) {
        return null;
    }

    $file = $_FILES[$fieldName];
    if ($file["error"] !== UPLOAD_ERR_OK) {
        return null;
    }

    $originalName = $file["name"];
    $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    $allowed = ["jpg", "jpeg", "png", "webp", "gif"];

    if (!in_array($ext, $allowed, true)) {
        return null;
    }

    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
    }

    $newName = uniqid("img_", true) . "." . $ext;
    $destination = rtrim($folder, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $newName;

    if (!move_uploaded_file($file["tmp_name"], $destination)) {
        return null;
    }

    $baseDir = dirname(__DIR__);
    $relativePath = str_replace($baseDir, "", $destination);
    $relativePath = ltrim(str_replace("\\", "/", $relativePath), "/");
    return $relativePath;
}
