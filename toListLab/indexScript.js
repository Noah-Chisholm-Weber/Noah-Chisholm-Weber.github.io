let tasks = [];

async function getQuote() {
    try {
        let response  = await fetch("https://api.quotable.io/random");
        let data = await response.json();
        let author = data.author;
        let quote = data.content;

        alert("(Note: This quote timer is actually 24 hours from now) Your 24 Hour Quote: " + quote + " - " + author);
    } catch (error) {
        alert("Error Getting Your 24 Hour Quote");
    }
}

window.addEventListener("load", function () {
    console.log("loading page");
    this.requestAnimationFrame(()=>{
        let size = document.getElementById("taskInputFormSubsection").getBoundingClientRect().width;
        document.getElementById("taskInputFormContainer").style.width = size + "px";
        document.getElementById("taskInputFormContainer").style.height = size + "px";
        document.getElementById("wrapper").style.height = size + "px";
        document.getElementById("taskInputForm").onsubmit = createTask;
    });
    const url = new URLSearchParams(window.location.search);
    const shouldDelExpandedTask = url.get("delTask");
    console.log(shouldDelExpandedTask);
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if(shouldDelExpandedTask != null && shouldDelExpandedTask == 1){
        console.log("removing task");
        let taskToRemove = JSON.parse(sessionStorage.getItem("expandedTask"));
        tasks = tasks.filter(task => task.taskName !== taskToRemove.taskName);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    tasks.forEach(task => displayTask(task.taskName))
    let count = sessionStorage.getItem("taskCount") || 0;
    document.getElementById("taskCount").innerHTML = count;
    const tempDate = new Date();
    
    const hasQuoted = document.cookie
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith("hasQuoted="));
    console.log(hasQuoted);
    console.log(this.document.cookie)
    if(hasQuoted !== 'hasQuoted=1'){
        const date = new Date();
        date.setTime(date.getTime() + (1 * 86400 * 1000));
        document.cookie = "hasQuoted=" + 1 + "; expires=" + date.toUTCString() + "; path=/";
        getQuote();
    }
});


function santizeString(input){
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function expandTask() {
    let taskOut;
    for(let i = 0; i < tasks.length; i ++){
        if(tasks[i].taskName === this.innerText){
            taskOut = tasks[i];
            sessionStorage.setItem("expandedTask", JSON.stringify(taskOut));
            window.location.href = "expandedTask.html";
            return;
        }
    }
}

function createTask(event) {
    event.preventDefault();
    const nameField = document.getElementById("taskName");
    let sanName = santizeString(nameField.value);
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].taskName === sanName){
            alert("That task already exsists! Please use another name.");
            return;
        }
    }
    const descriptionField = document.getElementById("taskDescription");
    tasks.push({
        taskName: sanName,
        taskDesc: santizeString(descriptionField.value)
    });
    displayTask(sanName);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    let count = sessionStorage.getItem("taskCount");
    count++;
    sessionStorage.setItem("taskCount", count);
    document.getElementById("taskCount").innerHTML = count;
}

function displayTask(name) {
    const scrollArea = document.getElementById("taskListDisplay");
    let temp = document.createElement("p");
    temp.style.border = "1px solid black";
    temp.innerText = name;
    temp.addEventListener("click", expandTask);
    scrollArea.appendChild(temp);
}