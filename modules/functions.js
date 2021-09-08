import { icons, Note } from "./classes.js";
import { noteContainer, noteState } from "../main.js";
import { navbar, determineNavState } from "./navbar.js";

function existingTagNotes(tag, storedNotes) {
  const tagNotes = [];
  storedNotes.forEach((note) => {
    if (note.labels.includes(tag.label)) {
      tagNotes.push(note);
    }
  });

  return tagNotes;
}

export function updateTagListsObjects(tags, storedNotes) {
  for (let tag in tags) {
    let currentTag = tags[tag];
    currentTag.noteList = existingTagNotes(currentTag, storedNotes);
  }
}
export const renderNotesFromList = (storedNotes) => {
  noteContainer.innerHTML = "";
  if (storedNotes.length > 0) {
    noteState.style.display = "none";
    storedNotes.forEach((note) => {
      renderNote(note);
    });
  } else {
    noteState.style.display = "block";
  }
};

function clearActiveTabs() {
  document.querySelectorAll(".tags-notes").forEach((e) => {
    e.classList.remove("tags-notes--active");
  });
}
export function resetActiveTab() {
  document.querySelectorAll(".tags-notes").forEach((e) => {
    if (!e.querySelector("#All")) e.classList.remove("tags-notes--active");
  });
}

export function renderNavTags(tags, tagsUl, notesUl) {
  for (let tag in tags) {
    let currentTag = tags[tag];
    const li = document.createElement("li");
    li.classList.add("tags-notes");
    li.addEventListener("click", () => {
      renderNotesFromList(currentTag.noteList);
      navbar.classList.remove("slide-in");
      determineNavState();
      clearActiveTabs();
      li.classList.add("tags-notes--active");
      currentTag.noteList.length > 0
        ? (noteState.style.display = "none")
        : (noteState.style.display = "block");
    });
    const tagIcon = icons[currentTag.label.toLowerCase()];
    li.appendChild(tagIcon);

    const label = document.createElement("p");
    label.classList.add(currentTag.label);
    label.textContent = currentTag.label;
    li.appendChild(label);

    let span = document.querySelector(`#${tag.label}`);
    if (span == null) {
      span = document.createElement("span");
    }
    span.id = currentTag.label;
    span.classList.add("all-types");
    li.appendChild(span);
    currentTag.isTag ? tagsUl.appendChild(li) : notesUl.appendChild(li);
  }
}

export function updateTagListsUI(tags) {
  for (let key in tags) {
    let tag = tags[key];
    const span = document.querySelector(`#${tag.label}`);
    span.textContent = tag.noteList.length;
  }
}

export function setNavTags(storedNotes, tags) {
  if (storedNotes.length > 0) {
    updateTagListsObjects(tags, storedNotes);
  }
  updateTagListsUI(tags);
}
//============================
export const closeModal = (modal, btn) => {
  modal.classList.remove("modal-visible");
  btn.classList.remove("new-hidden");
};
export const openModal = (modal, btn) => {
  modal.classList.add("modal-visible");
  btn.classList.add("new-hidden");
};

export const clearNote = (noteArea) => {
  noteArea.value = "";
};
//====================
export const renderNote = (note) => {
  if (note.HTML == null) {
    note.HTML = new Note().HTML;
  }
  noteContainer.appendChild(note.HTML());
};
