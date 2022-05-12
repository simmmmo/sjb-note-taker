const express = require('express');
const path = require('path');
const fs = require('fs');
const dbData = './db/db.json';
// Import crypto library to produce unique id
const crypto = require('crypto');

const port = process.env.PORT || 3000;
//Define host IP to resolve errors in Heroku
const host = '0.0.0.0';

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// GET Route for Notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET route to read the json file and return all saved notes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

// GET Wildcard route to direct catchall to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

 //A function to receive a new note and ammend to json file
app.post('/api/notes', (req, res) => {

  let newNote = {
    id: crypto.randomBytes(16).toString('hex'),
    title: req.body.title,
    text: req.body.text,
  };

  let noteList = JSON.parse(fs.readFileSync(dbData, 'utf8'));
 
   //A function to push new note to the existing data in json file
  noteList.push(newNote);

   //A function to write the updated data to db.json
  fs.writeFileSync(dbData, JSON.stringify(noteList, null, '\t'));
  res.json(noteList);
  console.log('Your note has been added');
});

app.delete('/api/notes/:id', (req, res) => {
  let noteList = JSON.parse(fs.readFileSync(dbData, 'utf8'));
  let noteId = (req.params.id).toString();
 
    //A function to search for all note by id that dont match the deleted note and saves as a new array
    noteList = noteList.filter(selected =>{
      return selected.id != noteId;
  })

    //A function to write the updated data to db.json and display the updated note
    fs.writeFileSync(dbData, JSON.stringify(noteList, null, '\t'));
    res.json(noteList);
    console.log('Your note has been deleted');

});


// Server Listener Port
app.listen(port, host, ()=> 
  console.log(`App listening at http://localhost:${port} 🚀`)
);