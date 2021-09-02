class NoteContainer {
  constructor(label) {
    this.label = label;
    this.notesList = [];
    this.notes = this.notesList.length;
    this.icon;
  }
}

export class NoteType extends NoteContainer {
  constructor(nodeType) {
    super(nodeType);
    this.parentElement = notes;
  }
}

export class Tag extends NoteContainer {
  constructor(tagName, icon) {
    super(tagName);
    this.parentElement = tags;
    this.icon = '<i class="far fa-bookmark"></i>';
  }
}
