<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login to DriftWheels</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>

    <div class="navbar">
        <div class="logo">DriftWheels</div>
        <div class="menu">
            <a href="index.php"><button>Home</button></a>
            <a href="about-us.php"><button>About Us</button></a>
            <a href="sell-car.php"><button>Sell Car</button></a>
            <a href="login.php"><button>Login</button></a>
        </div>
    </div>

    <div class="login-container">
        <h1>Login to DriftWheels</h1>

        <div class="login-box">
            <form id="loginForm" action="#" method="POST">

                <div class="input-group">
                    <label>Email</label>
                    <input id="loginEmail" type="email" class="input-field" placeholder="Enter your email">
                    <small id="loginEmailMsg"></small>
                </div>

                <div class="input-group">
                    <label>Password</label>
                    <input id="loginPassword" type="password" class="input-field" placeholder="Enter your password">
                    <small id="loginPasswordMsg"></small>
                </div>

                <button type="submit" class="action-btn">Login</button>

                <p class="switch-form-text">
                    Don't have an account? <a href="signup.php">Sign Up</a>
                </p>

            </form>
        </div>
    </div>

    <div class="footer">
        © 2026 DriftWheels
    </div>

    <script src="assets/js/nav-auth.js"></script>
    <script src="assets/js/login.js"></script>

</body>

</html>