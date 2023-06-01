// Dependencies for routing middleware
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFileAsync, writeFileAsync, readAndAddData } = require('../lib/notesFunctions');


// Render already saved notes on page load. Read the db.json file and return as valid JSON object.
router.get('/notes', function (req, res) {
  readFileAsync('./db/db.json')
    .then((notes) => res.json(JSON.parse(notes)));
});
  
// Display specific note by id, read all notes, then convert to JSON object and filter for note.id and return resulting array
router.get('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFileAsync('./db/db.json')
    .then((notes) => JSON.parse(notes))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return res.json(result);
    });
});

router.post('/notes', (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  readAndAddData(newNote, './db/db.json');

  res.json(newNote);

  console.log('New note successfully added:', newNote);
});
  
// Remove individual notes by id using 'uuid'
router.delete('/notes/:id', (req, res) => {
  console.log('Note successfully deleted');
  const noteId = req.params.id;
  readFileAsync('./db/db.json')
    .then((notes) => JSON.parse(notes))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);

      writeFileAsync('./db/db.json', result);
            
      res.json({ message: 'Successfully deleted' });
    });
});
  

module.exports = router;
