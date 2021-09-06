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

const st = window.localStorage;
const storedNotes = st.length > 0 ? JSON.parse(st.getItem("notes")) : [];
// ========================CLASSES=====================================

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

// class NoteContainer {
//   constructor(label) {
//     this.label = label;
//     this.notes = [];
//     this.icon;
//   }
// }

// class NoteType extends NoteContainer {
//   constructor(label) {
//     super(label);
//   }
// }

class Tag {
  constructor(label) {
    this.label = label;
    this.noteList = [];
  }
}
const tags = {
  travel: new Tag("Travel"),
  personal: new Tag("Personal"),
  life: new Tag("Life"),
  work: new Tag("Work"),
  untagged: new Tag("Untagged"),
};

function existingTagNotes(tag) {
  const tagNotes = [];
  storedNotes.forEach((note) => {
    if (note.tagName === tag.label) {
      tagNotes.push(note);
    }
  });
  return tagNotes;
}

function updateTagListsObjects() {
  for (let tag in tags) {
    tags[tag].noteList = existingTagNotes(tags[tag]);
  }
}

const tagsUl = document.querySelector("#tags");

const returnIcon = (tagName) => {
  return icons[tagName];
};

function renderNavTags() {
  for (let tag in tags) {
    let currentTag = tags[tag];
    const li = document.createElement("li");
    li.classList.add("tags-notes");

    const tagIcon = icons[currentTag.label.toLowerCase()];
    li.appendChild(tagIcon);

    const label = document.createElement("p");
    label.classList.add(currentTag.label);
    label.textContent = currentTag.label;
    li.appendChild(label);

    let span = document.querySelector(`#${tag.label}`);
    if (span == null) {
      span = document.createElement("span");
    }
    span.id = currentTag.label;
    li.appendChild(span);

    tagsUl.appendChild(li);
  }
}
renderNavTags();

function updateTagListsUI() {
  for (let key in tags) {
    let tag = tags[key];
    const span = document.querySelector(`#${tag.label}`);
    span.textContent = tag.noteList.length;
  }
}

function setNavTags() {
  if (storedNotes.length == 0) {
  } else {
    updateTagListsObjects();
  }
  updateTagListsUI();
}

setNavTags();

class Note {
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

//============================OBJECTS===============================
// export const noteTypes = {
//   all: new NoteType("All notes"),
//   "to-dos": new NoteType("To-Dos"),
//   favourites: new NoteType("Favourites"),
// };

export const tagsAndNoteTypes = {
  tags: { ...tags },
};

//============================FUNCTIONS=============================

const notesUl = document.querySelector("#notes");

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
export const removeNote = (e, storedNotes) => {
  let i = 0;
  const note = e.target.parentNode.parentNode;
  let newNote = note;
  while (newNote.previousElementSibling != null) {
    i++;
    newNote = newNote.previousElementSibling;
  }
  //opposite of tag.noteList.push(note) in add function
  let [removed] = storedNotes.splice(i, 1);
  for (let key in tags) {
    let tag = tags[key];
    let i = tag.noteList.indexOf(removed);
    if (i != -1) {
      tag.noteList.splice(i, 1);
    }
  }
  note.remove();
  setNavTags();
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

const renderNotesFromStorage = () => {
  storedNotes.forEach((note) => {
    renderNote(noteContainer, note);
  });
};

renderNotesFromStorage();

const addNote = (e) => {
  let noteText = noteArea.value.trim();
  let tag = tags[tagSelect.value];
  if (noteText.length > 0) {
    const note = new Note(noteText, tag.label);
    tag.noteList.push(note);
    renderNote(noteContainer, note);
    storedNotes.push(note);
    window.localStorage.setItem("notes", JSON.stringify(storedNotes));
    setNavTags();
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
