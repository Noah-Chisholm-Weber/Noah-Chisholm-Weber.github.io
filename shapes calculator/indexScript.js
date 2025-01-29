let basicInputForm = "";

function dimensionSelected() {
    let calculationForm = document.getElementById("calculations");
    let newOptions = '<option value="">Select One</option>';
    let dimensionsCount = document.getElementById("dimensions");
    calculationForm.value = "";
    let img = document.getElementById("mainImg");
    img.src = "";
    if(dimensionsCount.value == "2d"){
        newOptions += '<option value="perimeter">Perimeter</option>';
        newOptions += '<option value="area">Area</option>';
        img.src = "triangle.png";
    } else if(dimensionsCount.value == "3d") {
        newOptions += '<option value="volume">Volume</option>';
        img.src = "triangularPrism.png";
    }
    calculationForm.innerHTML = newOptions
    let inputForm = document.getElementById("inputForm");
    let removables = inputForm.getElementsByClassName("removable");
    while(removables.length != 0){
        removables[0].remove();
    }
}

function calculationSelected() {
    let inputForm = document.getElementById("inputForm");
    let removables = inputForm.getElementsByClassName("removable");
    while(removables.length != 0){
        removables[0].remove();
    }

    let calculationForm = document.getElementById("calculations");
    let dimensionsCount = document.getElementById("dimensions");
    let dimensionsValue = dimensionsCount.value;
    let calculationValue = calculationForm.value;
    let formUpdate = inputForm.innerHTML;
    let img = document.getElementById("mainImg");
    switch (calculationForm.value) {
        case "perimeter":
            img.src = "triangle_perimeter.png";
            formUpdate +=
            `
                <br class="removable" >

                <label class="removable" for="sideA">Side A (A): </label>
                <input class="removable" id="sideA" name="sideA">

                <br class="removable" >

                <label class="removable" for="sideB">Side B (B): </label>
                <input class="removable" id="sideB" name="sideB">

                <br class="removable" >

                <label class="removable" for="sideC">Side C (C): </label>
                <input class="removable" id="sideC" name="sideC">
            `;
            break;
        case "area":
            img.src = "triangle_area.png";
            formUpdate +=
            `
                <br class="removable">

                <label class="removable" for="width">Width (W): </label>
                <input class="removable" id="width" name="width">

                <br class="removable">

                <label class="removable" for="height">Height (H): </label>
                <input class="removable" id="height" name="height">
            `;
            break;
        case "volume":
            img.src = "triangularPrism_Volume.png";
            formUpdate +=
            `
                <br class="removable">

                <label class="removable" for="width">Width (W): </label>
                <input class="removable" id="width" name="width">

                <br class="removable">

                <label class="removable" for="height">Height (H): </label>
                <input class="removable" id="height" name="height">

                <br class="removable">

                <label class="removable" for="length">Length (L): </label>
                <input class="removable" id="length" name="length">
            `;
            break;
        default:
    }
    formUpdate +='<br class="removable"><button class="removable" id="submitButton" onclick="doCalculation()">Submit</button><br class="removable">';
    inputForm.innerHTML = formUpdate;
    dimensionsCount = document.getElementById("dimensions");
    calculationForm = document.getElementById("calculations");
    dimensionsCount.value = dimensionsValue;
    calculationForm.value = calculationValue;
}

function doCalculation() {
    let inputForm = document.getElementById("inputForm");
    let removables = inputForm.getElementsByClassName("outPutRemovable");
    while(removables.length != 0){
        removables[0].remove();
    }

    let calculationForm = document.getElementById("calculations");
    let dimensionsCount = document.getElementById("dimensions");
    let dimensionsValue = dimensionsCount.value;
    let calculationValue = calculationForm.value;
    let formUpdate = inputForm.innerHTML;
    let result = 0;
    switch (calculationForm.value) {
        case "area":
            result = calculateArea();
            formUpdate += '<br class="removable outPutRemovable"><label class="removable outPutRemovable">The area is: </label><label class="removable outPutRemovable" id="output"></label>';
            break;
        case "volume":
            result = calculateVolume();
            formUpdate += '<br class="removable outPutRemovable"><label class="removable outPutRemovable">The area is: </label><label class="removable outPutRemovable" id="output"></label>';
            break;
        case "perimeter":
            result = calculatePerimeter();
            formUpdate += '<br class="removable outPutRemovable"><label class="removable outPutRemovable">The Volume is: </label><label class="removable outPutRemovable" id="output"></label>';
            break;
        default:
    }

    inputForm.innerHTML = formUpdate;
    dimensionsCount = document.getElementById("dimensions");
    calculationForm = document.getElementById("calculations");
    dimensionsCount.value = dimensionsValue;
    calculationForm.value = calculationValue;

    document.getElementById("output").innerHTML = result;
}

function calculateArea(){
    let width = parseFloat(document.getElementById("width").value);
    let height = parseFloat(document.getElementById("height").value);
    return width * height / 2;
}

function calculatePerimeter(){
    let sideA = parseFloat(document.getElementById("sideA").value);
    let sideB = parseFloat(document.getElementById("sideB").value);
    let sideC = parseFloat(document.getElementById("sideC").value);

    return sideA + sideB + sideC;
}

function calculateVolume() {
    let width = parseFloat(document.getElementById("width").value);
    let height = parseFloat(document.getElementById("height").value);
    let length = parseFloat(document.getElementById("length").value);

    return width * height * length / 3;
}