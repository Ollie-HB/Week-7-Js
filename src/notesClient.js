class NotesClient {
  loadNotes(callback, displayError) {
    fetch('http://localhost:3000/notes')
    .then(response => response.json())
    .then(data => {
      callback(data);
      })
      .catch((error) => {
        console.log('Oops, something went wrong!')
      displayError(error);
    });
  };

  createNote(note){
    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content: note}),
    }
    fetch('http://localhost:3000/notes', request)
    .then((response) => response.json())
    .then((data) => {
      console.log('New note added:', data);
    });
  };
};

module.exports = NotesClient;