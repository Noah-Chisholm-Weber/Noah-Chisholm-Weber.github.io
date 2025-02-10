async function insertUser(username, age) {
    const response = await fetch("https://testserverdatabase.duckdns.org/insertUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ username: username, age: age })
    });

    const result = await response.json();
    console.log(result); // Output API response
    document.getElementById("result").innerText = result.message || result.error;
}

async function login(userName) {
    const response = await fetch("https://testserverdatabase.duckdns.org/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ username: userName})
    });
    const result = await response.json();
    console.log(result);
    document.getElementById("result").innerText = result.message || result.error;
}

// Example usage when clicking a button
document.getElementById("submit").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const age = document.getElementById("age").value;
    insertUser(username, age);
});

document.getElementById("login").addEventListener("click", function() {
    const userName = document.getElementById("userNameSignIn").value;
    login(userName);
});
