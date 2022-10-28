/**
 * @jest-environment jsdom
 */

const fs = require('fs');

const NotesView = require('./notesView');
const NotesClient = require('./notesClient');
const NotesModel = require('./notesModel');
 
 describe('Tests NotesView', () => {
   
   beforeEach(() => {
     document.body.innerHTML = fs.readFileSync('./index.html');
   });

  it('displays all notes with the note class tag', () => {
    const model = new NotesModel;
    const view = new NotesView(model);

    model.addNote('One note');
    model.addNote('Two note');
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

    it('can add and display a newly inputted note', () => {
      const model = new NotesModel;
      const fakeClient = {
        createNote: (note) => 'New note added: Test'
      }
      const view = new NotesView(model, fakeClient);

      const inputEl = document.querySelector('#note-input');
      inputEl.value = 'Test'

      const buttonEl = document.querySelector('#add-note-button');
      buttonEl.click();

      expect(document.querySelectorAll('div.note').length).toBe(1);
      expect(document.querySelectorAll('div.note')[0].textContent).toBe('Test');
    });

    it('clears old notes and displays correct list', () => {
      const model = new NotesModel;
      const view = new NotesView(model);
  
      model.addNote('One note');
      model.addNote('Two note');
      view.displayNotes();
      view.displayNotes();
  
      expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('displays and loads notes from API', () => {
    const model = new NotesModel;
    const fakeClient = {
      loadNotes: (callback) => {
      callback(['This is a mockery']); 
      }
    }
    const view = new NotesView(model, fakeClient);

    view.displayNotesFromApi();
    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual('This is a mockery');
  });

  it('displays an error when the fetch fails', () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    view.displayError();
    expect(document.querySelector('p.error').textContent).toBe('Oops, something went wrong!');
  })
});