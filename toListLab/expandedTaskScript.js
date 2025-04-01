window.addEventListener("load", () => {
    const task = JSON.parse(sessionStorage.getItem("expandedTask"));
    document.getElementById("pageTitle").innerHTML = task.taskName;
    document.getElementById("taskNameDisplay").textContent = task.taskName;
    document.getElementById("taskDescriptionDisplay").textContent = task.taskDesc;
    document.getElementById("delete").addEventListener("click", function () {
        window.location.href = "index.html?delTask=1";
    });
    document.getElementById("return").addEventListener("click", function () {
        window.location.href = "index.html";
    });
});