export const appendNotesToNav = (noteTypeList) => {
  noteTypeList.forEach((noteType) => {
    noteType.parentElement.appendChild(noteType.getHTML());
  });
};
