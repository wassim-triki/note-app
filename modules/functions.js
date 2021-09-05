export const addNoteTypes = (noteTypesList) => {
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

export const getTagIcon = (tagObj) => {
  const i = document.createElement("i");
  tagObj.label == "Untagged" ? i.classList.add("far") : i.classList.add("fas");
  i.classList.add("fa-bookmark");
  i.classList.add(tagObj.color);
  return i;
};

export const addTags = (tags) => {
  tags.forEach((tag) => {
    const li = document.createElement("li");
    li.classList.add("tags-notes");
    const span = document.createElement("span");
    span.textContent = `${tag.label} (${tag.notes})`;
    const i = getTagIcon(tag);
    li.appendChild(i);
    li.appendChild(span);
    tag.parentElement.appendChild(li);
  });
};

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
export const removeNote = (e) => {
  const note = e.target.parentNode.parentNode;
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
