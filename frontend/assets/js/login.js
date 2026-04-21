var loginForm = document.getElementById("loginForm");
var loginEmailInput = document.getElementById("loginEmail");
var loginPasswordInput = document.getElementById("loginPassword");
var loginEmailMsg = document.getElementById("loginEmailMsg");
var loginPasswordMsg = document.getElementById("loginPasswordMsg");

function setLoginMsg(msgElement, text, ok) {
    msgElement.textContent = text;
    if (ok) {
        msgElement.style.color = "green";
    } else {
        msgElement.style.color = "red";
    }
}

function checkLoginEmail(email) {
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        return "Enter a valid email address";
    }

    var atPos = email.indexOf("@");
    var dotPos = email.lastIndexOf(".");

    if (atPos < 1 || dotPos < atPos + 2 || dotPos === email.length - 1) {
        return "Enter a valid email address";
    }
    return "";
}


loginEmailInput.addEventListener("input", function () {
    var loginEmail = loginEmailInput.value.trim();
    var emailError = checkLoginEmail(loginEmail);

    if (loginEmail.length > 0 && emailError !== "") {
        setLoginMsg(loginEmailMsg, emailError, false);
    } else {
        loginEmailMsg.textContent = "";
    }
});


loginPasswordInput.addEventListener("input", function () {
    loginPasswordMsg.textContent = "";
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var loginEmail = loginEmailInput.value.trim();
    var loginPassword = loginPasswordInput.value;

    var emailError = checkLoginEmail(loginEmail);
    if (emailError !== "") {
        alert(emailError);
        return;
    }

    var formData = new FormData();
    formData.append("email", loginEmail);
    formData.append("password", loginPassword);

    fetch("../backend/login.php", {
        method: "POST",
        body: formData
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (data.ok) {
                loginPasswordMsg.textContent = "";
                alert("Login successful");
                window.location.href = "index.php";
            } else {
                setLoginMsg(loginPasswordMsg, data.message || "Wrong password", false);
                alert(data.message || "Wrong username or password");
            }
        })
        .catch(function () {
            alert("Could not login right now");
        });
});
