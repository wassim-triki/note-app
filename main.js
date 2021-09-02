import { NoteType, Tag } from "./modules/classes.js";
import { appendNoteTypes, appendTags } from "./modules/functions.js";

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

const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".fa-bars");
const navShrink = document.querySelector(".fa-times");
navToggle.addEventListener("click", () => {
  navbar.classList.add("slide-in");
});
navShrink.addEventListener("click", () => {
  navbar.classList.remove("slide-in");
});
