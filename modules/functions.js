import { Tag } from "./classes.js";
import { icons } from "./objects.js";

export const appendNotesToNav = (noteTypeList) => {
  noteTypeList.forEach((noteType) => {
    const parent = noteType.parentElement;
    let htmlString = `<li class="tags-notes">${noteType.icon}${noteType.label} (${noteType.notes})</i>`;

    if (noteType instanceof Tag) {
      console.log(noteType);
      htmlString = `<li class="tags-notes">${
        icons[noteType.label.toLowerCase()]
      }${noteType.label}</i> (${noteType.notes})`;
    }
    parent.innerHTML += htmlString;
  });
};
