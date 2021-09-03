import { NoteType, Tag } from "./modules/classes.js";
import { appendNoteTypes, appendTags } from "./modules/functions.js";
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
const noteModal = document.querySelector(".modal");
newNoteBtn.addEventListener("click", () => {
  noteModal.classList.add("modal-visible");
  newNoteBtn.classList.add("new-hidden");
});
closeModalBtn.addEventListener("click", () => {
  noteModal.classList.remove("modal-visible");
  newNoteBtn.classList.remove("new-hidden");
});
