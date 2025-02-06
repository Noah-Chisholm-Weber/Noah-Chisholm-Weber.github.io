let values = [];

function addValue() {
    let inputField = document.getElementById("numInput");
    let valueToAdd = Number(inputField.value);
    if(!Number.isNaN(valueToAdd)){
        values.push(valueToAdd);
        printValues();
    } else {
        inputField.value = "Invalid Value!";
    }
}

function printValues() {
    let output = "";
    for(let value of values) {
        output += value + ", ";
    }
    output = output.slice(0, -2);
    document.getElementById("valueDisplay").innerHTML = output;
    recalculateMean();
}

function removeValue() {
    let inputField = document.getElementById("numInput");
    let valueToRemove = Number(inputField.value);
    if(!Number.isNaN(valueToRemove)) {
        let index = values.indexOf(valueToRemove);
        if(index > -1){
           values.splice(index,1);
           printValues();
        } else {
            inputField.value = "Value missing";
        }
    } else {
        inputField.value = "Invalid Value!";
    }
}

function recalculateMean() {
    let sum = 0;
    for(let value of values) {
        sum += value;
    }
    sum /= values.length;
    document.getElementById("meanDisplay").innerHTML = sum;
}