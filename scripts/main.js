const navbar = document.querySelector(".navbar");
const notes = document.querySelector("#notes");
const tags = document.querySelector("#tags");
class NoteContainer {
  constructor(label) {
    this.label = label;
    this.notesList = [];
    this.notes = this.notesList.length;
  }
  getHTML() {
    const li = document.createElement("li");
    li.textContent = this.label;
    li.classList.add("tags-notes");
    return li;
  }
}

class NoteType extends NoteContainer {
  constructor(nodeType) {
    super(nodeType);
    this.parentElement = notes;
  }
}

const allNotes = new NoteType("All Notes");
const toDos = new NoteType("To-dos");
const favourites = new NoteType("Fovourites");
noteTypeList = [allNotes, toDos, favourites];

class Tag extends NoteContainer {
  constructor(tagName) {
    super(tagName);
    this.parentElement = tags;
  }
}

const travel = new Tag("Travel");
const personal = new Tag("Personal");
const life = new Tag("Life");
const work = new Tag("Work");
const untagged = new Tag("Untagged");
const tagList = [travel, personal, life, work, untagged];

const allNoteTypes = [...noteTypeList, ...tagList];

allNoteTypes.forEach((noteType) => {
  noteType.parentElement.appendChild(noteType.getHTML());
});
