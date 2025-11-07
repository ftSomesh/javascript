const notesContaier = document.querySelector(".notes-container")
const notes = document.querySelectorAll(".input-box-container")
const createBtn = document.querySelector("#create-btn")
const deleteBtn = document.querySelector("#delete-button")

function showNotes() {
    let data = localStorage.getItem("data");

    if (!data || data.trim() === "") {
        // Create default note and store it immediately
        data = `
      <div class="input-box-container">
        <p class="input-box" contenteditable="true">
          Welcome to the Notes App !
        </p>
        <img id="delete-button" src="./images/delete.png">
      </div>
    `;
        localStorage.setItem("data", data);
    }

    notesContaier.innerHTML = data;
}

showNotes();
function updateStorage() {
    localStorage.setItem("data", notesContaier.innerHTML);
}
function addNotes() {
    const noteStructure = `
        <div class="input-box-container">
            <p class="input-box" contenteditable="true">
            </p>
            <img src="./images/delete.png">
        </div>
    `
    notesContaier.innerHTML += noteStructure
    updateStorage();
}

function deleteNote(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
    else if (e.target.tagName === "P") {
        notesCon = document.querySelectorAll(".input-box-container")
        notesCon.forEach((note) => {
            note.onkeyup = function () {
                updateStorage();
            }
        })

    }
}

notesContaier.addEventListener("click", deleteNote)