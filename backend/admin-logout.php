<?php
require_once "common.php";

unset($_SESSION["admin"]);

json_response(true, "Admin logged out", null);