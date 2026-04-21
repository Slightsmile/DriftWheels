<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile - DriftWheels</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>

    <div class="navbar">
        <a class="logo" href="index.php">DriftWheels</a>
        <div class="menu">
            <a href="index.php"><button>Home</button></a>
            <a href="timeline.php"><button>Browse</button></a>
            <a href="sell-car.php"><button>Sell Car</button></a>
            <a href="profile.php"><button>Profile</button></a>
            <a href="../backend/logout-redirect.php"><button>Logout</button></a>
        </div>
    </div>

    <div class="profile-container">
        <h1>User Profile</h1>

        <div class="profile-image-section">
            <img id="profileImage" src="https://via.placeholder.com/150" alt="Profile Picture">
            <br>
            <input type="file" id="imageUpload" accept="image/*">
            <p id="imageError" style="color: red; display: none;"></p>
        </div>

        <form class="profile-form" id="profileForm">
            <div class="input-group">
                <label>Full Name</label>
                <input type="text" id="fullName" name="fullName" class="input-field" placeholder="Enter your full name" required>
                <p id="nameError" style="color: red; display: none;"></p>
            </div>

            <div class="input-group">
                <label>Email</label>
                <input type="email" id="email" name="email" class="input-field" placeholder="Enter your email" required>
            </div>

            <div class="input-group">
                <label>Phone Number</label>
                <input type="tel" id="phoneNumber" name="phone" class="input-field" value="+880" placeholder="Enter your phone number" required>
                <p id="phoneError" style="color: red; display: none;"></p>
            </div>

            <div class="input-group">
                <label>Address</label>
                <textarea id="address" name="address" class="input-field" rows="3" placeholder="Enter your address" required></textarea>
            </div>

            <div class="input-group">
                <label>Bio</label>
                <textarea id="bio" name="bio" class="input-field" rows="4" placeholder="Tell us about yourself"></textarea>
            </div>

            <button type="submit" class="action-btn">Save Profile</button>
        </form>
    </div>

    <div class="footer">
        © 2026 DriftWheels. All rights reserved.
    </div>

    <script src="assets/js/nav-auth.js"></script>
    <script src="assets/js/profile.js"></script>

</body>

</html>