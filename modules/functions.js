const notesUl = document.querySelector("#notes");
const tagsUl = document.querySelector("#tags");

import { tagsAndNoteTypes } from "./classes.js";

const addNavItems = () => {
  for (item in tagsAndNoteTypes) {
    console.log(item);
  }
};

addNavItems();
// export const addNoteTypes = (noteTypesList) => {
//   noteTypesList.forEach((type) => {
//     const li = document.createElement("li");
//     li.classList.add("tags-notes");
//     li.innerHTML = `${type.icon} <span>${type.label} (${type.notes})</span>`;
//     notesUl.appendChild(li);
//     li;
//   });
// };

// export const getTagIcon = (tagObj) => {
//   const i = document.createElement("i");
//   tagObj.label == "Untagged" ? i.classList.add("far") : i.classList.add("fas");
//   i.classList.add("fa-bookmark");
//   i.classList.add(tagObj.color);
//   return i;
// };

// export const addTags = (tags) => {
//   tags.forEach((tag) => {
//     const li = document.createElement("li");
//     li.classList.add("tags-notes");
//     const span = document.createElement("span");
//     span.textContent = `${tag.label} (${tag.notes})`;
//     const i = getTagIcon(tag);
//     li.appendChild(i);
//     li.appendChild(span);
//     tagsUl.appendChild(li);
//   });
// };

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

export const addModalTags = (tags, select) => {
  tags.reverse().forEach((tag) => {
    const option = document.createElement("option");
    option.textContent = tag.label;
    option.value = tag.label.toLowerCase();
    select.appendChild(option);
  });
};

export const resetTagSelect = (select) => {
  select.getElementsByTagName("option")[0].selected = "selected";
};

export const randInt = (min = 0, max = 10000) => {
  return Math.floor(Math.random() * (max - min) + min);
};
