<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post Timeline - DriftWheels</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/timeline.css">
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

    <main class="timeline-page">
        <section class="timeline-hero">
            <h1>All Car Listings</h1>
            <p>Browse all cars in simple cards.</p>
        </section>

        <section class="timeline-section">
            <div class="post-count" id="postCount">Loading...</div>
            <div class="timeline-feed" id="timelineFeed"></div>
        </section>
    </main>

    <div class="footer">
        © 2026 DriftWheels. All rights reserved.
    </div>

    <script src="assets/js/nav-auth.js"></script>
    <script src="assets/js/timeline.js"></script>
</body>

</html>
