document.getElementById("submit").addEventListener("click", async () => {
    let username = document.getElementById("usernameEntry").value;
    let password = document.getElementById("passwordEntry").value;
    let passwordConfirmation = document.getElementById("passwordConfirmation").value;
    let role = document.getElementById("role").value;

    if(username == "") alert("Missing Username!");
    else if(password == "") alert("Missing Password!");
    else if(role == "") alert("Missing Role!");
    else if(password != passwordConfirmation) alert("Your passwords do not match!");
    else {
        const response = await fetch("https://testserverdatabase.duckdns.org/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ username: username, password: password, role: role, JWT: localStorage.getItem("jwtToken")})
        });
        if(response.error == "-1"){
            alert("Please Login");
            logout();
        } else if(response.error == "0") {
            alert("Success!");
        } else {
            alert(response.error);
        }
    }
});