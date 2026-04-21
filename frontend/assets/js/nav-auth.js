(function () {
    function setLinkState(anchor, isLoggedIn) {
        if (!anchor) {
            return;
        }

        var button = anchor.querySelector("button");

        if (isLoggedIn) {
            anchor.setAttribute("href", "../backend/logout_redirect.php");
            if (button) {
                button.textContent = "Logout";
            } else {
                anchor.textContent = "Logout";
            }
        } else {
            anchor.setAttribute("href", "login.php");
            if (button) {
                button.textContent = "Login";
            } else {
                anchor.textContent = "Login";
            }
        }
    }

    function findLoginLikeLink(menu) {
        var links = menu.querySelectorAll("a");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var href = (link.getAttribute("href") || "").toLowerCase();
            var button = link.querySelector("button");
            var text = (button ? button.textContent : link.textContent).trim().toLowerCase();

            if (href.indexOf("login.php") !== -1 || href.indexOf("../backend/logout_redirect.php") !== -1 || text === "login" || text === "logout") {
                return link;
            }
        }
        return null;
    }

    function updateMenus(isLoggedIn) {
        var menus = document.querySelectorAll(".menu");
        for (var i = 0; i < menus.length; i++) {
            var loginLink = findLoginLikeLink(menus[i]);
            setLinkState(loginLink, isLoggedIn);
        }
    }

    fetch("../backend/session.php", {
        method: "GET",
        credentials: "same-origin"
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var loggedIn = !!(data && data.data && data.data.loggedIn);
            updateMenus(loggedIn);
        })
        .catch(function () {
            updateMenus(false);
        });
})();
