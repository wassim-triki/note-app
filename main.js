import { NoteType, Note } from "./modules/classes.js";
import {
  addNoteTypes,
  addTags,
  closeModal,
  openModal,
  clearNote,
  addModalTags,
  resetTagSelect,
} from "./modules/functions.js";
import { navbarToggle } from "./modules/navbar.js";
import { tags } from "./modules/objects.js";

const allNotes = new NoteType("All Notes");
allNotes.icon = '<i class="far fa-clipboard"></i>';
const toDos = new NoteType("To-dos");
toDos.icon = '<i class="far fa-check-circle"></i>';
const favourites = new NoteType("Fovourites");
favourites.icon = '<i class="far fa-star"></i>';
const noteTypeList = [allNotes, toDos, favourites];

const tagList = [];
for (const key in tags) {
  tagList.push(tags[key]);
}

addNoteTypes(noteTypeList);
addTags(tagList);

navbarToggle();

const tagSelect = document.querySelector("#tag-select");

addModalTags(tagList, tagSelect);

const newNoteBtn = document.querySelector("#new");
const closeModalBtn = document.querySelector("#close-modal");
const discardBtn = document.querySelector(".discard");
const doneBtn = document.querySelector(".done");
const noteModal = document.querySelector(".modal");
const modalClosingBtns = [discardBtn, closeModalBtn, doneBtn];
const noteArea = document.querySelector("#note-text");

const noteContainer = document.querySelector(".container");

const notes = [];

const addNote = (e) => {
  let noteText = noteArea.value.trim();
  let [tag] = tagList.filter((t) => t.label.toLowerCase() == tagSelect.value);
  if (noteText.length > 0) {
    const note = new Note(noteText, tag);
    noteContainer.appendChild(note.HTML());
    notes.push(note);
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
    console.log(notes);
  });
});

newNoteBtn.addEventListener("click", () => {
  openModal(noteModal, newNoteBtn);
});

doneBtn.addEventListener("click", () => {
  addNote;
});
