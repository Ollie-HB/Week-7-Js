const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe('NotesClient class', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });
  
  it('calls fetch and loads notes data', (done) => {
    
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify({
      name: "Some value",
    }));

    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.name).toBe("Some value");
      done();
    });
   });

  // it('calls fetch and creates a new note', (done) => {

  //   const client = new NotesClient()

  //     fetch.mockResponseOnce(JSON.stringify({
  //       content: "test note",
  //     }));

  //     ...
  //     ...
  //       done();
  //     });
  //  });
});