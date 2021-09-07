import { icons, Note } from "./classes.js";
function existingTagNotes(tag, storedNotes) {
  const tagNotes = [];
  storedNotes.forEach((note) => {
    if (note.tagName === tag.label) {
      tagNotes.push(note);
    }
  });
  return tagNotes;
}

export function updateTagListsObjects(tags, storedNotes) {
  for (let tag in tags) {
    tags[tag].noteList = existingTagNotes(tags[tag], storedNotes);
  }
}

export function renderNavTags(tags, tagsUl, notesUl) {
  for (let tag in tags) {
    let currentTag = tags[tag];
    const li = document.createElement("li");
    li.classList.add("tags-notes");

    const tagIcon = icons[currentTag.label.toLowerCase()];
    console.log(currentTag);
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
    span.classList.add("all-types");
    li.appendChild(span);
    currentTag.isTag ? tagsUl.appendChild(li) : notesUl.appendChild(li);
  }
}

export function updateTagListsUI(tags) {
  for (let key in tags) {
    let tag = tags[key];
    const span = document.querySelector(`#${tag.label}`);
    span.textContent = tag.noteList.length;
  }
}

export function setNavTags(storedNotes, tags) {
  if (storedNotes.length > 0) {
    updateTagListsObjects(tags, storedNotes);
  }
  updateTagListsUI(tags);
}
//============================
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
//====================
export const renderNote = (noteContainer, note) => {
  if (note.HTML == null) {
    note.HTML = new Note().HTML;
  }
  noteContainer.appendChild(note.HTML());
};

export const renderNotesFromStorage = (storedNotes, noteContainer) => {
  storedNotes.forEach((note) => {
    renderNote(noteContainer, note);
  });
};
