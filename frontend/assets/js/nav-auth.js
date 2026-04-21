(function () {
    var ADMIN_LOGIN_KEY = "adminLoggedIn";

    function getButtonText(link) {
        var button = link.querySelector("button");
        return (button ? button.textContent : link.textContent).trim().toLowerCase();
    }

    function setButtonText(link, text) {
        var button = link.querySelector("button");
        if (button) {
            button.textContent = text;
            return;
        }
        link.textContent = text;
    }

    function createMenuButtonLink(href, label) {
        var link = document.createElement("a");
        link.setAttribute("href", href);

        var button = document.createElement("button");
        button.type = "button";
        button.textContent = label;

        link.appendChild(button);
        return link;
    }

    function setLinkState(anchor, isLoggedIn) {
        if (!anchor) {
            return;
        }

        var hasAdminSession = !!window.__driftwheelsAdminLoggedIn;

        if (isLoggedIn) {
            if (hasAdminSession) {
                anchor.setAttribute("href", "../backend/admin-logout.php");
                anchor.dataset.adminLogout = "true";
            } else {
                anchor.setAttribute("href", "../backend/logout-redirect.php");
                anchor.dataset.adminLogout = "";
            }
            setButtonText(anchor, "Logout");
        } else {
            anchor.setAttribute("href", "login.php");
            anchor.dataset.adminLogout = "";
            setButtonText(anchor, "Login");
        }
    }

    function findLoginLikeLink(menu) {
        var links = menu.querySelectorAll("a");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var href = (link.getAttribute("href") || "").toLowerCase();
            var text = getButtonText(link);

            if (href.indexOf("login.php") !== -1 || href.indexOf("../backend/logout-redirect.php") !== -1 || text === "login" || text === "logout") {
                return link;
            }
        }
        return null;
    }

    function findSellCarLink(menu) {
        var links = menu.querySelectorAll("a");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var href = (link.getAttribute("href") || "").toLowerCase();
            var text = getButtonText(link);

            if (href.indexOf("sell-car.php") !== -1 || text === "sell car") {
                return link;
            }
        }
        return null;
    }

    function findProfileLink(menu) {
        var links = menu.querySelectorAll("a");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var href = (link.getAttribute("href") || "").toLowerCase();
            var text = getButtonText(link);

            if (href.indexOf("profile.php") !== -1 || text === "profile") {
                return link;
            }
        }
        return null;
    }

    function ensureProfileLink(menu, isUserLoggedIn, loginLink) {
        var profileLink = findProfileLink(menu);

        if (!isUserLoggedIn) {
            if (profileLink) {
                profileLink.style.display = "none";
            }
            return;
        }

        if (!profileLink) {
            profileLink = createMenuButtonLink("profile.php", "Profile");
            if (loginLink && loginLink.parentNode === menu) {
                menu.insertBefore(profileLink, loginLink);
            } else {
                menu.appendChild(profileLink);
            }
        }

        profileLink.style.display = "";
        profileLink.setAttribute("href", "profile.php");
        setButtonText(profileLink, "Profile");

        if (loginLink && profileLink !== loginLink && profileLink.nextElementSibling !== loginLink) {
            menu.insertBefore(profileLink, loginLink);
        }
    }

    function updateMenus(isLoggedIn) {
        var menus = document.querySelectorAll(".menu");
        for (var i = 0; i < menus.length; i++) {
            var menu = menus[i];
            var loginLink = findLoginLikeLink(menu);
            var sellCarLink = findSellCarLink(menu);
            var hasAdminSession = !!window.__driftwheelsAdminLoggedIn;
            var isUserLoggedIn = isLoggedIn && !hasAdminSession;

            setLinkState(loginLink, isLoggedIn);
            ensureProfileLink(menu, isUserLoggedIn, loginLink);

            if (loginLink && loginLink.dataset.adminLogout === "true" && !loginLink._adminLogoutBound) {
                loginLink._adminLogoutBound = true;
                loginLink.addEventListener("click", function (event) {
                    event.preventDefault();

                    fetch("../backend/admin-logout.php", {
                        method: "POST",
                        credentials: "same-origin"
                    })
                        .finally(function () {
                            localStorage.removeItem(ADMIN_LOGIN_KEY);
                            window.location.href = "admin.php";
                        });
                });
            }

            if (sellCarLink) {
                sellCarLink.style.display = isLoggedIn ? "" : "none";
            }
        }
    }

    var isAdminLoggedIn = localStorage.getItem(ADMIN_LOGIN_KEY) === "yes";

    fetch("../backend/session.php", {
        method: "GET",
        credentials: "same-origin"
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var loggedIn = !!(data && data.data && data.data.loggedIn);
            window.__driftwheelsAdminLoggedIn = !!(data && data.data && data.data.adminLoggedIn);
            updateMenus(loggedIn || isAdminLoggedIn);
        })
        .catch(function () {
            window.__driftwheelsAdminLoggedIn = isAdminLoggedIn;
            updateMenus(isAdminLoggedIn);
        });
})();
