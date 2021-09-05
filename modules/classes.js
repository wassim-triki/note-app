import { getFormattedDate, /*getTagIcon,*/ removeNote } from "./functions.js";
import { notesList } from "../main.js";

class NoteContainer {
  constructor(label) {
    this.label = label;
    this.notes = 0;
  }
}

export class NoteType extends NoteContainer {
  constructor(label) {
    super(label);
  }
}

export class Tag extends NoteContainer {
  constructor(label, color) {
    super(label);
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
    trash.addEventListener("click", (e) => {
      removeNote(e, notesList);
      window.localStorage.setItem("notes", JSON.stringify(notesList));
    });
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

//===========================================================
export const noteTypes = {
  all: new NoteType("All notes"),
  toDos: new NoteType("To-Dos"),
  favourites: new NoteType("Favourites"),
};

export const tags = {
  travel: new Tag("Travel", "green"),
  personal: new Tag("Personal", "cyan"),
  life: new Tag("Life", "yellow"),
  work: new Tag("Work", "red"),
  untagged: new Tag("Untagged", "blue"),
};

const iconFromClasses = (...classes) => {
  const i = document.createElement("i");
  classes.forEach((c) => {
    i.classList.add(c);
  });
  return i;
};

export const icons = {
  all: iconFromClasses("far", "fa-clipboard"),
  toDos: iconFromClasses("far", "check-circle"),
  favourites: iconFromClasses("far", "fa-star"),
  travel: iconFromClasses("fas", "fa-bookmark"),
  personal: iconFromClasses("fas", "fa-bookmark"),
  life: iconFromClasses("fas", "fa-bookmark"),
  work: iconFromClasses("fas", "fa-bookmark"),
  untagged: iconFromClasses("far", "fa-bookmark"),
};

export const tagsAndNoteTypes = {
  ...noteTypes,
  ...tags,
};
