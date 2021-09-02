import { colors } from "./objects.js";

export const appendNoteTypes = (noteTypesList) => {
  noteTypesList.forEach((type) => {
    const li = document.createElement("li");
    li.classList.add("tags-notes");
    const span = document.createElement("span");
    span.textContent = `${type.label} (${type.notes})`;
    li.innerHTML = `${type.icon} <span>${type.label} (${type.notes})</span>`;
    type.parentElement.appendChild(li);
    li;
  });
};

export const appendTags = (tags) => {
  tags.forEach((tag) => {
    const li = document.createElement("li");
    li.classList.add("tags-notes");
    const i = document.createElement("i");
    const span = document.createElement("span");
    span.textContent = `${tag.label} (${tag.notes})`;
    tag.label == "Untagged" ? i.classList.add("far") : i.classList.add("fas");
    i.classList.add("fa-bookmark");
    i.style.color = colors[tag.label.toLowerCase()];
    li.appendChild(i);
    li.appendChild(span);
    tag.parentElement.appendChild(li);
  });
};
