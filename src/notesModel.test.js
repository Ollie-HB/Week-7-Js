const NotesModel = require('./notesModel');

describe('NotesModel', () => {
  it('creates an empty array for notes', () => {
    notes = new NotesModel();
    expect(notes.getNotes()).toEqual([])
  });

  it('adds new note(s) to array', () => {
    notes = new NotesModel();
    notes.addNote('Buy milk');
    notes.addNote('Go to the gym');
    expect(notes.getNotes()).toEqual(['Buy milk', 'Go to the gym'])
  })

  it('can empty the notes array with reset', () =>{
    notes = new NotesModel();
    notes.addNote('Buy milk');
    notes.addNote('Go to the gym');
    notes.reset();
    expect(notes.getNotes()).toEqual([])
  })

  
});