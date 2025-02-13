function getJWTJson(token) {
    return JSON.parse(atob(token.split('.')[1]));
}

function logout() {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login.html";  // Redirect to login
}

function isTokenExpired(token) {
    const expireDate = getJWTJson(token).exp;
    return expireDate * 1000 < Date.now(); // Convert to milliseconds & check
}

function checkTokenExpiration() {
    const token = localStorage.getItem("jwtToken");
    
    if (!token || isTokenExpired(token)) {
        alert("Session expired. Please log in again.");
        logout(); // Log out and redirect
    }
}

// Call this function on every page load
checkTokenExpiration();