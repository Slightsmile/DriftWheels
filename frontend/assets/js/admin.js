"use strict";

var ADMIN_USERNAME = "admin";
var ADMIN_PASSWORD = "admin123";

var adminLoginForm = document.getElementById("adminLoginForm");
var adminUserInput = document.getElementById("adminUser");
var adminPassInput = document.getElementById("adminPass");
var adminLoginMsg = document.getElementById("adminLoginMsg");

function showAdminMessage(text, isError) {
    if (!adminLoginMsg) {
        return;
    }

    adminLoginMsg.textContent = text;
    adminLoginMsg.className = isError ? "form-message form-message-error" : "form-message form-message-success";
}

function validateAdminCredentials(username, password) {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var username = adminUserInput ? adminUserInput.value.trim() : "";
        var password = adminPassInput ? adminPassInput.value : "";

        if (validateAdminCredentials(username, password)) {
            localStorage.setItem("adminLoggedIn", "yes");
            window.location.href = "admin-dashboard.php";
            return;
        }

        showAdminMessage("Invalid username or password.", true);
    });
}
