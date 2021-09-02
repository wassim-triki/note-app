export const appendNotesToNav = (noteTypeList) => {
  noteTypeList.forEach((noteType) => {
    const parent = noteType.parentElement;
    let htmlString = `<li class="tags-notes">${noteType.icon}${noteType.label}</i>`;
    parent.innerHTML += htmlString;
  });
};
