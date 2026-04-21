<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Details - DriftWheels</title>
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

    <div class="car-details-container">
        <h1 id="car-title">Toyota Corolla X</h1>

        <div class="slider-container">
            <input type="radio" name="slider" id="slide1" checked>
            <input type="radio" name="slider" id="slide2">
            <input type="radio" name="slider" id="slide3">
            <input type="radio" name="slider" id="slide4">
            <input type="radio" name="slider" id="slide5">
            <input type="radio" name="slider" id="slide6">
            <input type="radio" name="slider" id="slide7">
            <input type="radio" name="slider" id="slide8">
            <input type="radio" name="slider" id="slide9">
            <input type="radio" name="slider" id="slide10">

            <div class="slides">
                <div class="slide">
                    <img src="https://via.placeholder.com/600x400" alt="Car Image 1">
                </div>
                <div class="slide">
                    <img src="https://via.placeholder.com/600x400" alt="Car Image 2">
                </div>
                <div class="slide">
                    <img src="https://via.placeholder.com/600x400" alt="Car Image 3">
                </div>
                <div class="slide">
                    <img src="https://via.placeholder.com/600x400" alt="Car Image 4">
                </div>
                <div class="slide">
                    <img src="https://via.placeholder.com/600x400" alt="Car Image 5">
                </div>
                <div class="slide">
                    <img src="https://via.placeholder.com/600x400" alt="Car Image 6">
                </div>
                <div class="slide">
                    <img src="https://via.placeholder.com/600x400" alt="Car Image 7">
                </div>
                <div class="slide">
                    <img src="https://via.placeholder.com/600x400" alt="Car Image 8">
                </div>
                <div class="slide">
                    <img src="https://via.placeholder.com/600x400" alt="Car Image 9">
                </div>
                <div class="slide">
                    <img src="https://via.placeholder.com/600x400" alt="Car Image 10">
                </div>
            </div>

            <div class="slider-nav">
                <label for="slide1"></label>
                <label for="slide2"></label>
                <label for="slide3"></label>
                <label for="slide4"></label>
                <label for="slide5"></label>
                <label for="slide6"></label>
                <label for="slide7"></label>
                <label for="slide8"></label>
                <label for="slide9"></label>
                <label for="slide10"></label>
            </div>
        </div>

        <div class="car-info">
            <h2>Car Details</h2>

            <div class="detail-row">
                <span class="detail-label">Price:</span>
                <span class="detail-value" id="car-price">৳ 1,000,000</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Model Year:</span>
                <span class="detail-value" id="car-year">2020</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Condition:</span>
                <span class="detail-value" id="car-condition">Used</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Mileage:</span>
                <span class="detail-value" id="car-mileage">45,000 km</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Fuel Type:</span>
                <span class="detail-value" id="car-fuel">Petrol</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Transmission:</span>
                <span class="detail-value" id="car-transmission">Automatic</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Color:</span>
                <span class="detail-value" id="car-color">White</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Location:</span>
                <span class="detail-value" id="car-location">Dhaka, Bangladesh</span>
            </div>
        </div>

        <div class="description-section">
            <h2>Description</h2>
            <p id="car-description">This is a well-maintained Toyota Corolla X in excellent condition. The car has been regularly serviced
                and comes with all original documents. Perfect for daily commute and family use.</p>
        </div>

        <div class="seller-info">
            <h2>Seller Information</h2>
            <div class="seller-details">
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value" id="seller-name">-</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value" id="seller-phone">-</span>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        © 2026 DriftWheels. All rights reserved.
    </div>

    <script src="assets/js/nav-auth.js"></script>
    <script src="assets/js/car-details.js"></script>

</body>

</html>