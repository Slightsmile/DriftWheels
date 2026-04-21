<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create a DriftWheels Account</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>

    <div class="navbar">
        <a class="logo" href="index.php">DriftWheels</a>
        <div class="menu">
            <a href="index.php"><button>Home</button></a>
            <a href="timeline.php"><button>Browse</button></a>
            <a href="sell-car.php"><button>Sell Car</button></a>
            <a href="login.php"><button>Login</button></a>
        </div>
    </div>

    <div class="signup-container">
        <h1>Create a DriftWheels Account</h1>

        <div class="signup-form">
            <form id="signupForm" action="#" method="POST">

                <div class="input-group">
                    <label>Full Name</label>
                    <input id="signupName" type="text" class="input-field">
                    <small id="nameMsg"></small>
                </div>

                <div class="input-group">
                    <label>Email</label>
                    <input id="signupEmail" type="email" class="input-field">
                    <small id="emailMsg"></small>
                </div>

                <div class="input-group">
                    <label>Phone Number</label>
                    <input id="signupPhone" type="text" class="input-field">
                    <small id="phoneMsg"></small>
                </div>

                <div class="input-group">
                    <label>Password</label>
                    <input id="signupPassword" type="password" class="input-field">
                    <small id="passwordMsg"></small>
                </div>

                <div class="input-group">
                    <label>Confirm Password</label>
                    <input id="signupConfirmPassword" type="password" class="input-field">
                    <small id="confirmMsg"></small>
                </div>

                <div class="input-group">
                    <label>Location</label>
                    <input id="signupLocation" type="text" class="input-field">
                </div>

                <button type="submit" class="action-btn">Sign Up</button>

                <p class="switch-form-text">
                    Already have an account? <a href="login.php">Login</a>
                </p>

            </form>
        </div>
    </div>

    <div class="footer">
        © 2026 DriftWheels
    </div>

    <script src="assets/js/nav-auth.js"></script>
    <script src="assets/js/signup.js"></script>

</body>

</html>