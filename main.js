import { Tag, Note } from "./modules/classes.js";
import { tags } from "./modules/objects.js";
import {
  renderNavTags,
  setNavTags,
  closeModal,
  openModal,
  clearNote,
  renderNotesFromStorage,
  renderNote,
} from "./modules/functions.js";
import { navbarToggle } from "./modules/navbar.js";
document.addEventListener("DOMContentLoaded", () => {});

const tagSelect = document.querySelector("#tag-select");
const newNoteBtn = document.querySelector("#new");
const closeModalBtn = document.querySelector("#close-modal");
const discardBtn = document.querySelector(".discard");
const doneBtn = document.querySelector(".done");
const noteModal = document.querySelector(".modal");
const modalClosingBtns = [discardBtn, closeModalBtn, doneBtn];
const noteArea = document.querySelector("#note-text");

const noteContainer = document.querySelector(".container");

const tagsUl = document.querySelector("#tags");
const notesUl = document.querySelector("#notes");

const st = window.localStorage;
const storedNotes = st.length > 0 ? JSON.parse(st.getItem("notes")) : [];

renderNotesFromStorage(storedNotes, noteContainer);
renderNavTags(tags, tagsUl);
setNavTags(storedNotes, tags);

navbarToggle();

export const removeNote = (e, storedNotes) => {
  let i = 0;
  const note = e.target.parentNode.parentNode;
  let newNote = note;
  while (newNote.previousElementSibling != null) {
    i++;
    newNote = newNote.previousElementSibling;
  }
  //opposite of tag.noteList.push(note) in add function
  let [removed] = storedNotes.splice(i, 1);
  for (let key in tags) {
    let tag = tags[key];
    let i = tag.noteList.indexOf(removed);
    if (i != -1) {
      tag.noteList.splice(i, 1);
    }
  }
  note.remove();
  setNavTags();
};

const addModalTags = (tags, select) => {
  const tagList = [];
  for (let tag in tags) {
    tagList.push(tags[tag]);
  }
  tagList.reverse().forEach((tag) => {
    const option = document.createElement("option");
    option.textContent = tag.label;
    option.value = tag.label.toLowerCase();
    select.appendChild(option);
  });
};
addModalTags(tags, tagSelect);

export const resetTagSelect = (select) => {
  select.getElementsByTagName("option")[0].selected = "selected";
};

export const randInt = (min = 0, max = 10000) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const addNote = (e) => {
  let noteText = noteArea.value.trim();
  let tag = tags[tagSelect.value];
  if (noteText.length > 0) {
    const note = new Note(noteText, tag.label);
    tag.noteList.push(note);
    storedNotes.push(note);
    renderNote(noteContainer, note);
    window.localStorage.setItem("notes", JSON.stringify(storedNotes));
    setNavTags(storedNotes, tags);
  }
};

modalClosingBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target == doneBtn) {
      addNote(e);
    }
    closeModal(noteModal, newNoteBtn);
    clearNote(noteArea);
    resetTagSelect(tagSelect);
  });
});

newNoteBtn.addEventListener("click", () => {
  openModal(noteModal, newNoteBtn);
});

doneBtn.addEventListener("click", (e) => {
  addNote(e);
});
