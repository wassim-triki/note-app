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
  }
}

const allNotes = new NoteType("All Notes");
const toDos = new NoteType("To-dos");
const favourites = new NoteType("Fovourites");

noteTypeList = [allNotes, toDos, favourites];
noteTypeList.forEach((noteType) => {
  notes.appendChild(noteType.getHTML());
});

class Tag extends NoteContainer {
  constructor(tagName) {
    super(tagName);
  }
}

const travel = new Tag("Travel");
const personal = new Tag("Personal");
const life = new Tag("Life");
const work = new Tag("Work");
const untagged = new Tag("Untagged");
const tagList = [travel, personal, life, work, untagged];
tagList.forEach((tag) => {
  tags.appendChild(tag.getHTML());
});

class Note {
  constructor(type) {
    this.toDo = false;
    this.favourite = false;
  }
}
