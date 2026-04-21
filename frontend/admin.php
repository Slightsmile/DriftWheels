<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - DriftWheels</title>
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

    <main class="admin-page">
        <section class="login-container admin-login-container">
            <h1>Admin Login</h1>
            <p class="admin-subtitle">Use your admin username and password to review pending car posts.</p>

            <div class="login-box">
                <form id="adminLoginForm" novalidate>
                    <div class="input-group">
                        <label for="adminUser">Username</label>
                        <input type="text" id="adminUser" class="input-field" placeholder="Enter your username">
                    </div>

                    <div class="input-group">
                        <label for="adminPass">Password</label>
                        <input type="password" id="adminPass" class="input-field" placeholder="Enter your password">
                    </div>

                    <button type="submit" class="action-btn">Login</button>
                    <p id="adminLoginMsg" class="form-message" aria-live="polite"></p>
                </form>
            </div>
        </section>
    </main>

    <div class="footer">
        © 2026 DriftWheels
    </div>

    <script src="assets/js/nav-auth.js"></script>
    <script src="assets/js/admin.js"></script>
</body>

</html>
