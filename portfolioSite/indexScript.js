function setLightMode() {
    document.getElementById("styleSheetLink").href = "lightModeStyle.css";
}

function setDarkMode() {
    document.getElementById("styleSheetLink").href = "darkModeStyle.css";
}

function updateFontText(){
    sliderValue = document.getElementById("fontSlider").value;
    document.getElementById("fontOut").innerHTML = sliderValue;
    document.getElementById("fontExample").style = "font-size:" + sliderValue + "px;";
}

function adjustFont() {
    sliderValue = document.getElementById("fontSlider").value;
    document.getElementById("body").style = "font-size:" + sliderValue + "px;";
}