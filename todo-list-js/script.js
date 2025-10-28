const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");
const defaultTaks = `
<li class="checked"><span id="task-content">You can tick the box if you have completed the task.</span><span id="cross">\u00d7</span></li>
<li><span id="task-content">Add your movies here</span><span id="cross">\u00d7</span></li>
<li><span id="task-content">Refreshing the page won't delete your data until you delete here. Do your stuffs closing the browser and get back whenever you feel to.</span><span id="cross">\u00d7</span></li>
`
function addTask() {
    if (inputBox.value === "") {
        alert("You must write something.")
    } else {
        let li = document.createElement("li")
        let spanText = document.createElement("span")
        spanText.id = "task-content";
        spanText.textContent = inputBox.value
        li.appendChild(spanText)
        listContainer.appendChild(li)

        let span = document.createElement("span")
        span.innerHTML = "\u00d7";
        span.id = "cross";
        li.appendChild(span);
        saveData();
    }
    inputBox.value = ""
}

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    else if (e.target.id === "cross") {
        e.target.parentElement.remove();
    }
    saveData();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function showData() {
    if (localStorage.getItem("data") && localStorage.getItem("data").trim() !== "") {
        listContainer.innerHTML = localStorage.getItem("data");
    } else {
        listContainer.innerHTML = defaultTaks;
    }

}

showData()