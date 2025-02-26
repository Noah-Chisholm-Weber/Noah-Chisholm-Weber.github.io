async function insertUser(username, password) {
    const response = await fetch("https://testserverdatabase.duckdns.org/createUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ username: username, password: password, role: 'CUSTOMER' })
    });

    const result = await response.json();
    console.log(result); // Output API response
    document.getElementById("result").innerText = result.message || result.error;
    login(username, password);
}

function getJWTJson(token) {
    return JSON.parse(atob(token.split('.')[1]));
}

async function login(userName, passWord) {
    const response = await fetch("https://testserverdatabase.duckdns.org/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ username: userName, password: passWord})
    });
    const result = await response.json();
    localStorage.setItem("jwtToken", result.JWT);

    const role  = getJWTJson(result.JWT).role;
    document.getElementById("loginOut").innerText = result.message || result.error;
    if(role == "ADMIN_L9") {
        window.location.href = "adminRedirect.html";
    } else {
        window.location.href = "store.html";
    }
}

// Example usage when clicking a button
document.getElementById("submit").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const passWord = document.getElementById("password").value;
    const secondPassword = document.getElementById("passwordAgain").value;
    if(username == "" || passWord == ""){
        document.getElementById("result").innerText = "Empty username or password.";
    } else if(passWord === secondPassword) {
        insertUser(username, passWord);
    } else {document.getElementById("result").innerText = "The passwords must match."}
});

document.getElementById("login").addEventListener("click", function() {
    const userName = document.getElementById("userNameSignIn").value;
    const passWord = document.getElementById("passwordSignIn").value;

    login(userName, passWord);
});

function switchToCreateNewCustomer() {
    document.getElementById('newUser').style.display = 'block';
    document.getElementById('oldUser').style.display = 'none';
}