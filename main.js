import { NoteType, Tag, Note } from "./modules/classes.js";
import {
  appendNoteTypes,
  appendTags,
  closeModal,
  openModal,
  clearNote,
} from "./modules/functions.js";
import { navbarToggle } from "./modules/navbar.js";

const allNotes = new NoteType("All Notes");
allNotes.icon = '<i class="far fa-clipboard"></i>';
const toDos = new NoteType("To-dos");
toDos.icon = '<i class="far fa-check-circle"></i>';
const favourites = new NoteType("Fovourites");
favourites.icon = '<i class="far fa-star"></i>';
const noteTypeList = [allNotes, toDos, favourites];

const travel = new Tag("Travel");
const personal = new Tag("Personal");
const life = new Tag("Life");
const work = new Tag("Work");
const untagged = new Tag("Untagged");
untagged.icon = '<i id="empty" class="far fa-bookmark"></i>';
const tagList = [travel, personal, life, work, untagged];

appendNoteTypes(noteTypeList);
appendTags(tagList);

navbarToggle();

const newNoteBtn = document.querySelector("#new");
const closeModalBtn = document.querySelector("#close-modal");
const discardBtn = document.querySelector(".discard");
const doneBtn = document.querySelector(".done");
const noteModal = document.querySelector(".modal");
const modalClosingBtns = [discardBtn, closeModalBtn];
const noteArea = document.querySelector("#note-text");

const noteContainer = document.querySelector(".container");

const notes = [];

const addNote = (container) => {
  let noteText = noteArea.value.trim();
  if (noteText.length > 0) {
    const note = new Note(noteText);
    container.appendChild(note.HTML());
    notes.push(note);
  }
  clearNote(noteArea);
  closeModal(noteModal, newNoteBtn);
};

modalClosingBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal(noteModal, newNoteBtn);
    clearNote(noteArea);
  });
});
newNoteBtn.addEventListener("click", () => {
  openModal(noteModal, newNoteBtn);
});

doneBtn.addEventListener("click", () => {
  addNote(noteContainer);
});
