class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector('#main-container');
    this.addButtonEl = document.querySelector('#add-note-button');

    this.addButtonEl.addEventListener('click', () => {
      const newNote = document.querySelector('#note-input').value;
      this.client.createNote(newNote)
      this.addNewNote(newNote);
      this.displayNotes()
    });
  }

  addNewNote(newNote) {
    this.model.addNote(newNote);
    this.displayNotes();
  }

  displayNotes(){
    document.querySelectorAll('.note').forEach(el =>{
      el.remove();
    });

    const notes = this.model.getNotes();
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.textContent = note;
      noteElement.className = 'note';
      document.querySelector('#note-input').value = ''
      this.mainContainerEl.append(noteElement);
    });
  };

  displayNotesFromApi(){
    this.client.loadNotes((notes) => {
      this.model.setNotes(notes);
      this.displayNotes();
    // }, () => {
    //   this.displayError();
    });
    
    //Needs to do 3 things:
    //1.load notes from api
    //2. set those notes on the model
    //3. once set, we need to display them
  }

  displayError(){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Oops, something went wrong!';
    errorMessage.className = 'error';
    this.mainContainerEl.append(errorMessage);
  }
};

module.exports = NotesView;
