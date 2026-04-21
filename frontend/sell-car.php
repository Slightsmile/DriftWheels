<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sell Your Car - DriftWheels</title>
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

    <div class="sell-car-container">
        <h1>Sell Your Car</h1>

        <form class="sell-car-form" id="sellCarForm" enctype="multipart/form-data">
            <h2>Car Information</h2>

            <div class="input-group">
                <label>Car Title</label>
                <input id="carTitle" name="car_title" type="text" class="input-field" placeholder="e.g. Toyota Corolla X">
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <div class="input-group">
                <label>Price (৳)</label>
                <input id="carPrice" name="price" type="number" class="input-field" placeholder="e.g. 1000000">
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <div class="input-group">
                <label>Model Year</label>
                <input id="modelYear" name="model_year" type="number" class="input-field" placeholder="e.g. 2020">
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <div class="input-group">
                <label>Condition</label>
                <select id="carCondition" name="car_condition" class="input-field">
                    <option value="">Select Condition</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="reconditioned">Reconditioned</option>
                </select>
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <div class="input-group">
                <label>Mileage (km)</label>
                <input id="carMileage" name="mileage" type="number" class="input-field" placeholder="e.g. 45000">
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <div class="input-group">
                <label>Fuel Type</label>
                <select id="fuelType" name="fuel_type" class="input-field">
                    <option value="">Select Fuel Type</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="cng">CNG</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                </select>
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <div class="input-group">
                <label>Transmission</label>
                <select id="transmission" name="transmission" class="input-field">
                    <option value="">Select Transmission</option>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                </select>
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <div class="input-group">
                <label>Color</label>
                <input id="carColor" name="color" type="text" class="input-field" placeholder="e.g. White">
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <div class="input-group">
                <label>Location</label>
                <input id="carLocation" name="car_location" type="text" class="input-field" placeholder="e.g. Dhaka, Bangladesh">
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <div class="input-group">
                <label>Description</label>
                <textarea id="carDescription" name="description" class="input-field" rows="5" placeholder="Describe your car in detail..."></textarea>
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <h2>Upload Photos (Maximum 10)</h2>

            <div class="photo-upload-section">
                <div class="photo-upload-item">
                    <label>Photo 1</label>
                    <input id="photo1" type="file" accept="image/*">
                </div>
                <div class="photo-upload-item">
                    <label>Photo 2</label>
                    <input id="photo2" type="file" accept="image/*">
                </div>
                <div class="photo-upload-item">
                    <label>Photo 3</label>
                    <input id="photo3" type="file" accept="image/*">
                </div>
                <div class="photo-upload-item">
                    <label>Photo 4</label>
                    <input id="photo4" type="file" accept="image/*">
                </div>
                <div class="photo-upload-item">
                    <label>Photo 5</label>
                    <input id="photo5" type="file" accept="image/*">
                </div>
                <div class="photo-upload-item">
                    <label>Photo 6</label>
                    <input id="photo6" type="file" accept="image/*">
                </div>
                <div class="photo-upload-item">
                    <label>Photo 7</label>
                    <input id="photo7" type="file" accept="image/*">
                </div>
                <div class="photo-upload-item">
                    <label>Photo 8</label>
                    <input id="photo8" type="file" accept="image/*">
                </div>
                <div class="photo-upload-item">
                    <label>Photo 9</label>
                    <input id="photo9" type="file" accept="image/*">
                </div>
                <div class="photo-upload-item">
                    <label>Photo 10</label>
                    <input id="photo10" type="file" accept="image/*">
                </div>
            </div>

            <h2>Seller Contact Information</h2>

            <div class="input-group">
                <label>Your Name</label>
                <input id="sellerName" name="seller_name" type="text" class="input-field" placeholder="Enter your name">
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <div class="input-group">
                <label>Phone Number</label>
                <input id="sellerPhone" name="seller_phone" type="tel" class="input-field" placeholder="Enter your phone number">
                <div class="field-error" style="color:red;font-size:14px;"></div>
            </div>

            <button type="submit" class="action-btn">Submit Listing</button>
                    <div id="error-message" style="color:red;margin-top:10px;"></div>
        </form>
    </div>

    <div class="footer">
        © 2026 DriftWheels. All rights reserved.
    </div>
<<<<<<< HEAD:frontend/sell-car.php
    <script src="assets/js/nav-auth.js"></script>
    <script src="assets/js/sell-car.js"></script>
=======
    <script src="sell-car.js"></script>
>>>>>>> 33bca730eff602bbd03bb58202a9f99632687761:sell-car.html

</body>

</html>