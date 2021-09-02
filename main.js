import { NoteType, Tag } from "./modules/classes.js";
import { appendNotesToNav } from "./modules/functions.js";

const allNotes = new NoteType("All Notes");
const toDos = new NoteType("To-dos");
const favourites = new NoteType("Fovourites");
const noteTypeList = [allNotes, toDos, favourites];

const travel = new Tag("Travel");
const personal = new Tag("Personal");
const life = new Tag("Life");
const work = new Tag("Work");
const untagged = new Tag("Untagged");
const tagList = [travel, personal, life, work, untagged];

const allNoteTypes = [...noteTypeList, ...tagList];
appendNotesToNav(allNoteTypes);
