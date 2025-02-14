function getJWTJson(token) {
    return JSON.parse(atob(token.split('.')[1]));
}

function logout() {
    localStorage.removeItem("jwtToken");
    window.location.href = "index.html";  // Redirect to login
}

function isTokenExpired(token) {
    const expireDate = getJWTJson(token).exp;
    return expireDate * 1000 < Date.now(); // Convert to milliseconds & check
}

function checkTokenExpiration() {
    const token = localStorage.getItem("jwtToken");
    console.log("checking expiration")
    if (!token || isTokenExpired(token)) {
        alert("Session expired. Please log in again.");
        logout(); // Log out and redirect
    }
}

function verifyPermissions(permission) {
    console.log("checking perms");
    if(getJWTJson(localStorage.getItem("jwtToken")).role != permission){
        logout();
    }
}

// Call this function on every page load
checkTokenExpiration();