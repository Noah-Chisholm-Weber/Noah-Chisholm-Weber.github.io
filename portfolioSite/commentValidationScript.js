window.addEventListener('load', () => {
    const inputRow = document.getElementById('inputRow');
    const div = document.getElementById('formContainer');

    const width = inputRow.getBoundingClientRect().width;

    div.style.width = `${width}px`;
});

const passwordField = document.getElementById("password");
const usernameField = document.getElementById("username");
const errorAlert = document.getElementById("errorAlert");
const inputForm = document.getElementById("inputForm");

document.addEventListener("mousemove", function(event){
    if(event.y > errorAlert.getBoundingClientRect().height){
        errorAlert.style.transform = "translateX(-50%)"
        errorAlert.style.top = "0%";
    }else{
        errorAlert.style.transform = "translateX(-50%) translateY(-100%)"
        errorAlert.style.top = "100%";
    }
});

function checkPassword (event){
    const value = passwordField.value;
    let output = "";
    let count = 0;
    if(value.length < 8 || value.length > 16){
        output += "The password must be between eight and sixteen characters."
        count++;
    }

    if(!/[a-z]/.test(value)){
        if(count > 0) output += "<br>";
        output += "The password must contain at least one lower case letter.";
        count++;
    }

    if(!/[A-Z]/.test(value)){
        if(count > 0) output += "<br>";
        output += "The password must contain at least one upper case letter.";
        count++;
    }

    if(!/[0-9]/.test(value)){
        if(count > 0) output += "<br>";
        output += "The password must contain at least one numeric value case letter.";
        count++;
    }

    if(!/[!@#$%^&]/.test(value)){
        if(count > 0) output += "<br>";
        output += "The password must contain at least one one of the following special characters: !, @, #, $, %, ^, &";
        count++;
    }

    if(count > 0){
        errorAlert.innerHTML = output;
        errorAlert.style.visibility = "visible";
        passwordField.style.border = "3px solid red";
        return false;
    }else{
        errorAlert.innerHTML = "";
        errorAlert.style.visibility = "hidden";
        passwordField.style.border = "none";
        return true;
    }
}

passwordField.addEventListener("input", checkPassword);

passwordField.addEventListener("focusout", function(event){
    if(checkPassword(event)){
        errorAlert.textContent = "";
        errorAlert.style.visibility = "hidden";
        passwordField.style.border = "none";
    } else {
        errorAlert.textContent = "";
        errorAlert.style.visibility = "hidden";
        passwordField.style.border = "3px solid red";
    }
});

function checkUsername (event){
    const value = usernameField.value;
    let output = "";
    let count = 0;
    if(value.length < 4 || value.length > 20){
        output += "The username must be between four and twenty characters."
        count++;
    }

    if(!/^[a-zA-Z_]+$/.test(value)){
        output += "The username only accepts upper and lower case letters and underscores."
        errorAlert.innerHTML = output;
        errorAlert.style.visibility = "visible";
        usernameField.style.border = "3px solid red";
        return false;
    }else{
        errorAlert.innerHTML = "";
        errorAlert.style.visibility = "hidden";
        usernameField.style.border = "none";
        return true;
    }
}

usernameField.addEventListener("input", checkUsername);

usernameField.addEventListener("focusout", function(event){
    if(checkUsername(event)){
        errorAlert.textContent = "";
        errorAlert.style.visibility = "hidden";
        usernameField.style.border = "none";
    } else {
        errorAlert.textContent = "";
        errorAlert.style.visibility = "hidden";
        usernameField.style.border = "3px solid red";
    }
});

function santizeString(input){
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

inputForm.addEventListener("submit", function(event){
    event.preventDefault();
    let inputs = [];
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let correctUser = checkUsername(event);
    let correctPass = checkPassword(event);
    if(correctPass && correctUser){
        inputs.push(santizeString(name));
        inputs.push(santizeString(phone));
        inputs.push(santizeString(email));
        inputs.push(santizeString(comment));
        inputs.push(santizeString(username));
        inputs.push(santizeString(password));
    }
    console.log(inputs);
});