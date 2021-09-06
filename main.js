// addNoteTypes(noteTypeList);
// addTags(tagList);

const tagSelect = document.querySelector("#tag-select");

const newNoteBtn = document.querySelector("#new");
const closeModalBtn = document.querySelector("#close-modal");
const discardBtn = document.querySelector(".discard");
const doneBtn = document.querySelector(".done");
const noteModal = document.querySelector(".modal");
const modalClosingBtns = [discardBtn, closeModalBtn, doneBtn];
const noteArea = document.querySelector("#note-text");

const noteContainer = document.querySelector(".container");

const noteList =
  window.localStorage.length > 0
    ? JSON.parse(window.localStorage.getItem("notes"))
    : [];

//========================CLASSES=====================================
class NoteContainer {
  constructor(label) {
    this.label = label;
    this.notes = 0;
  }
}

class NoteType extends NoteContainer {
  constructor(label) {
    super(label);
  }
}

class Tag extends NoteContainer {
  constructor(label, color) {
    super(label);
    this.color = color;
  }
}

class Note {
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
    const tagIcon = icons[this.tag.label.toLowerCase()];
    const headerTag = document.createElement("p");
    headerTag.textContent = this.tag.label;
    // noteHeader.appendChild(tagIcon);
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
      removeNote(e, noteList);
      window.localStorage.setItem("notes", JSON.stringify(noteList));
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

//============================OBJECTS===============================
export const noteTypes = {
  all: new NoteType("All notes"),
  "to-dos": new NoteType("To-Dos"),
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
  "to-dos": iconFromClasses("far", "fa-check-circle"),
  favourites: iconFromClasses("far", "fa-star"),
  travel: iconFromClasses("fas", "fa-bookmark", "green"),
  personal: iconFromClasses("fas", "fa-bookmark", "cyan"),
  life: iconFromClasses("fas", "fa-bookmark", "yellow"),
  work: iconFromClasses("fas", "fa-bookmark", "red"),
  untagged: iconFromClasses("far", "fa-bookmark", "blue"),
};

export const tagsAndNoteTypes = {
  noteTypes: { ...noteTypes },
  tags: { ...tags },
};

//============================FUNCTIONS=============================

const notesUl = document.querySelector("#notes");
const tagsUl = document.querySelector("#tags");

const navbar = document.querySelector(".navbar");
const navShrink = document.querySelector(".close-nav");

const navToggle = document.querySelector(".fa-bars");
function navbarToggle() {
  navToggle.addEventListener("click", () => {
    navbar.classList.add("slide-in");
  });
  navShrink.addEventListener("click", () => {
    navbar.classList.remove("slide-in");
  });
}
navbarToggle();

const getNotesNumber = (obj) => {
  if (noteList.length == 0) {
    obj.notes = 0;
  } else {
    if (obj.label === "All notes") {
      obj.notes = noteList.length;
    }
    noteList.forEach((n) => {
      if (obj.label === n.tag.label) {
        obj.notes = n.tag.notes;
      }
    });
  }
  return obj.notes;
};

const addNavItems = () => {
  let tn = tagsAndNoteTypes;
  for (let key in tn) {
    for (let key2 in tn[key]) {
      const current = tn[key][key2];
      const li = document.createElement("li");
      li.classList.add("tags-notes");
      li.appendChild(icons[key2]);
      const label = document.createElement("p");
      label.textContent = current.label;
      li.appendChild(label);
      const number = document.createElement("span");
      number.id = current.label;
      number.textContent = `(${getNotesNumber(current)})`;
      li.appendChild(number);
      key === "noteTypes" ? notesUl.appendChild(li) : tagsUl.appendChild(li);
    }
  }
};
addNavItems();

export const closeModal = (modal, btn) => {
  modal.classList.remove("modal-visible");
  btn.classList.remove("new-hidden");
};
export const openModal = (modal, btn) => {
  modal.classList.add("modal-visible");
  btn.classList.add("new-hidden");
};

export const clearNote = (noteArea) => {
  noteArea.value = "";
};

export const getFormattedDate = () => {
  return new Date().toString().slice(0, new Date().toString().lastIndexOf(":"));
};
export const removeNote = (e, notes) => {
  let i = 0;
  const note = e.target.parentNode.parentNode;
  let newNote = note;
  while (newNote.previousElementSibling != null) {
    i++;
    newNote = newNote.previousElementSibling;
  }
  notes.splice(i, 1);
  console.log(notes);
  note.remove();
};

const addModalTags = (tags, select) => {
  const tagList = [];
  for (let tag in tags) {
    tagList.push(tags[tag]);
  }
  tagList.reverse().forEach((tag) => {
    const option = document.createElement("option");
    option.textContent = tag.label;
    option.value = tag.label.toLowerCase();
    select.appendChild(option);
  });
};
addModalTags(tags, tagSelect);

export const resetTagSelect = (select) => {
  select.getElementsByTagName("option")[0].selected = "selected";
};

export const randInt = (min = 0, max = 10000) => {
  return Math.floor(Math.random() * (max - min) + min);
};

//============================================================
const renderNote = (container, note) => {
  if (note.HTML == null) {
    note.HTML = new Note().HTML;
  }
  container.appendChild(note.HTML());
};
const renderStoredNotes = () => {
  if (noteList.length > 0) {
    noteList.forEach((note) => {
      renderNote(noteContainer, note);
      console.log(note);
    });
  }
};
renderStoredNotes();
const addNote = (e) => {
  let noteText = noteArea.value.trim();
  let tag = tags[tagSelect.value];
  if (noteText.length > 0) {
    const note = new Note(noteText, tag);
    tag.notes++;
    renderNote(noteContainer, note);
    console.log(note);
    noteList.push(note);
    let span = document.querySelector(`#${tag.label}`);
    span.textContent = `(${tag.notes})`;
    window.localStorage.setItem("notes", JSON.stringify(noteList));
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
  });
});

newNoteBtn.addEventListener("click", () => {
  openModal(noteModal, newNoteBtn);
});

doneBtn.addEventListener("click", (e) => {
  addNote(e);
});
