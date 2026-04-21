<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - DriftWheels</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/timeline.css">
</head>

<body>
    <div class="navbar">
        <a class="logo" href="index.php">DriftWheels</a>
        <div class="menu">
            <a href="index.php"><button>Home</button></a>
            <a href="login.php"><button>Login</button></a>
        </div>
    </div>

    <main class="timeline-page admin-page">
        <section class="timeline-hero admin-hero">
            <div>
                <h1>Admin Dashboard</h1>
                <p>Manage available listings. Admin can only delete listings.</p>
            </div>
        </section>

        <section class="timeline-section">
            <div id="approvedCount" class="post-count">Loading available posts...</div>
            <div id="approvedCards" class="timeline-feed"></div>
        </section>
    </main>

    <div class="footer">
        © 2026 DriftWheels. All rights reserved.
    </div>

    <script src="assets/js/nav-auth.js"></script>
    <script src="assets/js/admin-panel.js"></script>
</body>

</html>
