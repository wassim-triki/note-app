import { removeNote, storedNotes } from "../main.js";
const iconFromClasses = (...classes) => {
  const i = document.createElement("i");
  classes.forEach((c) => {
    i.classList.add(c);
  });
  return i;
};
export const icons = {
  all: iconFromClasses("far", "fa-clipboard"),
  "to-dos": iconFromClasses("far", "fa-check-circle"),
  favourites: iconFromClasses("far", "fa-star"),
  travel: iconFromClasses("fas", "fa-bookmark", "green"),
  personal: iconFromClasses("fas", "fa-bookmark", "cyan"),
  life: iconFromClasses("fas", "fa-bookmark", "yellow"),
  work: iconFromClasses("fas", "fa-bookmark", "red"),
  untagged: iconFromClasses("far", "fa-bookmark", "blue"),
};
export class Tag {
  constructor(label) {
    this.label = label;
    this.noteList = [];
  }
}

const getFormattedDate = () => {
  return new Date().toString().slice(0, new Date().toString().lastIndexOf(":"));
};

export class Note {
  constructor(text, tagName) {
    this.text = text;
    this.tagName = tagName;
    this.date = getFormattedDate();
  }
  HTML() {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const noteHeader = document.createElement("div");
    noteHeader.classList.add("note-header");
    const tagIcon = icons[this.tagName.toLowerCase()].cloneNode(true);
    const headerTag = document.createElement("p");
    headerTag.textContent = this.tagName;
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
      removeNote(e, storedNotes);
      window.localStorage.setItem("notes", JSON.stringify(storedNotes));
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
