var signupForm = document.getElementById("signupForm");
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPhone = document.getElementById("signupPhone");
var signupPassword = document.getElementById("signupPassword");
var signupConfirmPassword = document.getElementById("signupConfirmPassword");
var signupLocation = document.getElementById("signupLocation");

var nameMsg = document.getElementById("nameMsg");
var emailMsg = document.getElementById("emailMsg");
var phoneMsg = document.getElementById("phoneMsg");
var passwordMsg = document.getElementById("passwordMsg");
var confirmMsg = document.getElementById("confirmMsg");

function setMsg(msgElement, text, ok) {
    msgElement.textContent = text;
    if (ok) {
        msgElement.style.color = "green";
    } else {
        msgElement.style.color = "red";
    }
}


function checkName(name) {
    for (var i = 0; i < name.length; i++) {
        var ch = name[i];
        var isLetter = (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
        var isSpace = ch === " ";

        if (!isLetter && !isSpace) {
            return "Name cannot contain numbers";
        }
    }
    return "";
}


function checkEmail(email) {
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


function checkPhone(phone) {
    if (phone.length === 0) {
        return "Phone number must contain only digits";
    }

    for (var j = 0; j < phone.length; j++) {
        var phoneChar = phone[j];
        if (phoneChar < "0" || phoneChar > "9") {
            return "Phone number must contain only digits";
        }
    }
    return "";
}

function checkPassword(password) {
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    var hasSmall = false;
    var hasCapital = false;
    var hasSpecial = false;
    var hasNumber = false;

    for (var k = 0; k < password.length; k++) {
        var p = password[k];

        if (p >= "a" && p <= "z") {
            hasSmall = true;
        } else if (p >= "A" && p <= "Z") {
            hasCapital = true;
        } else if (p >= "0" && p <= "9") {
            hasNumber = true;
        } else if ((p >= "0" && p <= "9") === false) {
            hasSpecial = true;
        }
    }

    if (!hasSmall) {
        return "Password must contain at least one small letter";
    }

    if (!hasCapital) {
        return "Password must contain at least one capital letter";
    }

    if (!hasSpecial) {
        return "Password must contain at least one special character";
    }

    if (!hasNumber) {
        return "Password must contain at least one number";
    }

    return "";
}


function checkConfirm(password, confirmPassword) {
    if (password !== confirmPassword) {
        return "Passwords do not match";
    }
    return "";
}


signupName.addEventListener("input", function () {
    var name = signupName.value.trim();
    var msg = checkName(name);

    if (name.length > 0 && msg !== "") {
        setMsg(nameMsg, msg, false);
    } else {
        nameMsg.textContent = "";
    }
});

signupEmail.addEventListener("input", function () {
    var email = signupEmail.value.trim();
    var msg = checkEmail(email);

    if (email.length > 0 && msg !== "") {
        setMsg(emailMsg, msg, false);
    } else {
        emailMsg.textContent = "";
    }
});

signupPhone.addEventListener("input", function () {
    var phone = signupPhone.value.trim();
    var msg = checkPhone(phone);

    if (phone.length > 0 && msg !== "") {
        setMsg(phoneMsg, msg, false);
    } else {
        phoneMsg.textContent = "";
    }
});

signupPassword.addEventListener("input", function () {
    var password = signupPassword.value;
    var msg = checkPassword(password);

    if (password.length > 0 && msg !== "") {
        setMsg(passwordMsg, msg, false);
    } else {
        passwordMsg.textContent = "";
    }

    var confirmValue = signupConfirmPassword.value;
    if (confirmValue.length > 0) {
        var confirmMessage = checkConfirm(password, confirmValue);
        if (confirmMessage !== "") {
            setMsg(confirmMsg, confirmMessage, false);
        } else {
            confirmMsg.textContent = "";
        }
    }
});

signupConfirmPassword.addEventListener("input", function () {
    var password = signupPassword.value;
    var confirmValue = signupConfirmPassword.value;
    var msg = checkConfirm(password, confirmValue);

    if (confirmValue.length > 0 && msg !== "") {
        setMsg(confirmMsg, msg, false);
    } else {
        confirmMsg.textContent = "";
    }
});

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = signupName.value.trim();
    var email = signupEmail.value.trim();
    var phone = signupPhone.value.trim();
    var password = signupPassword.value;
    var confirmPassword = signupConfirmPassword.value;
    var location = signupLocation.value.trim();

    var nameError = checkName(name);
    if (nameError !== "") {
        alert(nameError);
        return;
    }

    var emailError = checkEmail(email);
    if (emailError !== "") {
        alert(emailError);
        return;
    }

    var phoneError = checkPhone(phone);
    if (phoneError !== "") {
        alert(phoneError);
        return;
    }

    var passwordError = checkPassword(password);
    if (passwordError !== "") {
        alert(passwordError);
        return;
    }

    var confirmError = checkConfirm(password, confirmPassword);
    if (confirmError !== "") {
        alert(confirmError);
        return;
    }
   
    var userData = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        location: location
    };

    localStorage.setItem("driftUser", JSON.stringify(userData));

    alert("Signup successful");
    window.location.href = "login.html";
});
