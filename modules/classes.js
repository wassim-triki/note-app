class NoteContainer {
  constructor(label) {
    this.label = label;
    this.notesList = [];
    this.notes = this.notesList.length;
  }
}

export class NoteType extends NoteContainer {
  constructor(nodeType) {
    super(nodeType);
    this.parentElement = notes;
  }
}

export class Tag extends NoteContainer {
  constructor(tagName) {
    super(tagName);
    this.parentElement = tags;
  }
}
