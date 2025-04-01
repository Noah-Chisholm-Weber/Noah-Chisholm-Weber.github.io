<?php	
	session_start();
?>


<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link id="styleSheetLink" rel="stylesheet" href="darkModeStyle.css">
    <link id="styleSheetLink" rel="stylesheet" href="style.css">
    <script src="indexScript.js"></script>
</head>

<body id="body">
    <div id="wrapper">
        <div id="taskInputFormContainer">
        <form id="taskInputForm">
            <div id="taskInputFormSubsection">
                <label for="taskName">Name of task: </label>
                <input id="taskName" name="taskName" type="text">
                <br>
                <label>Tasks Added: </label> <label id="taskCount">0</label>
            </div>
            <br>
            <textarea id="taskDescription" placeholder="Enter task description here."></textarea>
            <input id="submit" type="submit">
        </form>
        </div>
        <div id="taskListDisplay">
            
        </div>
    </div>
    <div id="settingsDiv">
        <script>
            window.addEventListener("load", event => {
                // Get font cookie
                const fontCookie = document.cookie
                    .split(';')
                    .map(c => c.trim())
                    .find(c => c.startsWith("font="));
        
                const fontValue = fontCookie ? fontCookie.split('=')[1] : 24;
                document.getElementById("fontSlider").value = fontValue;
        
                updateFontText();
                adjustFont();
        
                // Get style cookie
                const styleCookie = document.cookie
                    .split(';')
                    .map(c => c.trim())
                    .find(c => c.startsWith("style="));
        
                const styleValue = styleCookie ? styleCookie.split('=')[1] : null;
        
                if (styleValue === "darkModeStyle.css") {
                    setDarkMode();
                } else if (styleValue === "lightModeStyle.css") {
                    setLightMode();
                } else {
                    setDarkMode(); // fallback default
                }
            });
        
            function setLightMode() {
                document.getElementById("styleSheetLink").href = "lightModeStyle.css";
                document.getElementById("lightModeButton").checked = true;
                const date = new Date();
                date.setTime(date.getTime() + (30 * 86400 * 1000));
                document.cookie = "style=lightModeStyle.css; expires=" + date.toUTCString() + "; path=/";
            }
        
            function setDarkMode() {
                document.getElementById("styleSheetLink").href = "darkModeStyle.css";
                document.getElementById("darkModeButton").checked = true;
                const date = new Date();
                date.setTime(date.getTime() + (30 * 86400 * 1000));
                document.cookie = "style=darkModeStyle.css; expires=" + date.toUTCString() + "; path=/";
            }
        
            function updateFontText() {
                const sliderValue = document.getElementById("fontSlider").value;
                const date = new Date();
                date.setTime(date.getTime() + (30 * 86400 * 1000));
                document.cookie = "font=" + sliderValue + "; expires=" + date.toUTCString() + "; path=/";
                document.getElementById("fontOut").textContent = sliderValue;
                document.getElementById("fontExample").style.fontSize = sliderValue + "px";
            }
        
            function adjustFont() {
                const sliderValue = document.getElementById("fontSlider").value;
                const date = new Date();
                date.setTime(date.getTime() + (30 * 86400 * 1000));
                document.cookie = "font=" + sliderValue + "; expires=" + date.toUTCString() + "; path=/";
                document.getElementById("body").style.fontSize = sliderValue + "px";
            }
        </script>        
        <h3>Settings</h3>
        <br>
        <form>
            <label for="lightModeButton">Light Mode</label>
            <input name="styleButtons" type="radio" id="lightModeButton" onclick="setLightMode()">
    
            <label for="darkModeButton">Dark Mode</label>
            <input name="styleButtons" type="radio" id="darkModeButton" onclick="setDarkMode()">
    
            <label for="fontSlider">Font Size: </label>
            <label id="fontOut">12</label>
            <input name="fontSlider" type="range" id="fontSlider" onChange="adjustFont()" oninput="updateFontText()" value="12" min="12" max="96">
            <label id="fontExample">Sample Text.</label>
        </form>
    </div>
</body>
</html>