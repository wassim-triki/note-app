import { getFormattedDate, getTagIcon, removeNote } from "./functions.js";

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
  constructor(tagName, color) {
    super(tagName);
    this.parentElement = tags;
    this.color = color;
  }
}

export class Note {
  constructor(text, tag) {
    this.text = text;
    this.tag = tag;
    this.date = getFormattedDate();
  }
  HTML() {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const noteHeader = document.createElement("div");
    noteHeader.classList.add("note-header");
    const tagIcon = getTagIcon(this.tag);
    const headerTag = document.createElement("p");
    headerTag.textContent = this.tag.label;
    noteHeader.appendChild(tagIcon);
    noteHeader.appendChild(headerTag);

    const noteFooter = document.createElement("div");
    noteFooter.classList.add("note-footer");
    const noteDate = document.createElement("p");
    noteDate.textContent = this.date;
    noteDate.classList.add("note-date");
    const trash = document.createElement("i");
    trash.classList.add("far");
    trash.classList.add("fa-trash-alt");
    trash.addEventListener("click", removeNote);
    noteFooter.appendChild(noteDate);
    noteFooter.appendChild(trash);

    const noteText = document.createElement("p");
    noteText.textContent = this.text;
    noteText.classList.add("note-text");

    noteDiv.appendChild(noteHeader);
    noteDiv.appendChild(noteText);
    noteDiv.append(noteFooter);
    return noteDiv;
  }
}
