import { getFormattedDate } from "./functions.js";

class NoteContainer {
  constructor(label) {
    this.label = label;
    this.notesList = [];
    this.notes = this.notesList.length;
    this.icon;
  }
}

export class NoteType extends NoteContainer {
  constructor(nodeType) {
    super(nodeType);
    this.parentElement = notes;
  }
}

export class Tag extends NoteContainer {
  constructor(tagName) {
    super(tagName);
    this.parentElement = tags;
    this.icon = '<i class="far fa-bookmark"></i>';
  }
}

export class Note {
  constructor(text) {
    this.text = text;
    this.date = getFormattedDate();
  }
  HTML() {
    const noteText = document.createElement("p");
    noteText.textContent = this.text;
    noteText.classList.add("note-text");
    const noteDate = document.createElement("p");
    noteDate.textContent = this.date;
    noteDate.classList.add("note-date");
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.appendChild(noteText);
    noteDiv.append(noteDate);
    return noteDiv;
  }
}
