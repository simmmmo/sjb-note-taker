
const notes = require('express').Router();
const fs = require('fs');

//route to read the `db.json` file and return all saved notes as JSON.
notes.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});


//receive a new note to save on the request body, add it to the `db.json` file, 
//and then return the new note to the client.
notes.post('/notes', (req, res) => {
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  let notelength = (noteList.length).toString();

  //create new property called id based on length and assign it to each json object
  newNote.id = notelength;
  //push updated note to the data containing notes history in db.json
  noteList.push(newNote);

  //write the updated data to db.json
  fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
  res.json(noteList);
})

module.exports = notes;