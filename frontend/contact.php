<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - DriftWheels</title>
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

    <div class="contact-container">
        <h1>Contact Us</h1>
        <p class="contact-intro">Having trouble? Need help? Send us a message and we'll get back to you as soon as
            possible.</p>

        <form class="contact-form" id="contactForm" method="POST" action="#">
            <div class="input-group">
                <label for="name">Your Name</label>
                <input type="text" id="name" name="name" class="input-field" placeholder="Enter your name" required>
            </div>

            <div class="input-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" class="input-field" placeholder="Enter your email" required>
            </div>

            <div class="input-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" name="subject" class="input-field" placeholder="What is this about?" required>
            </div>

            <div class="input-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" class="input-field" rows="6" placeholder="Describe your issue or question..."
                    required></textarea>
            </div>

            <button type="submit" class="action-btn">Send Message</button>
            <p id="contactError" style="color: red; display: none;"></p>
        </form>

        <div class="contact-info">
            <h2>Other Ways to Reach Us</h2>
            <p><b>Email:</b> support@driftwheels.com</p>
            <p><b>Phone:</b> +880 1234-567890</p>
            <p><b>Address:</b> Dhaka, Bangladesh</p>
        </div>
    </div>

    <div class="footer">
        © 2026 DriftWheels. All rights reserved.
    </div>

    <script src="assets/js/nav-auth.js"></script>
    <script src="assets/js/contact.js"></script>

</body>

</html>