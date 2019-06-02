const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const books = require('./database/mongoIndex.js');

const app = express();

app.use(express.static(path.join(__dirname, '/../client')));
app.use('/:id', express.static(path.join(__dirname, '/../client')));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/books/:id', (req, res) => {
  books.retrieve(req.params.id, (err, doc) => {
    // add err handling
    res.send(doc);
  });
});

app.post('/add', (req, res) => {
  books.save(req.body);
  res.status(201).send('Saved!')
});

// put request takes a JSON object with the changes, must include an id property
app.put('/update', (req, res) => {
  books.update(req.body);
  res.status(200).send('Updated!');
});

// delete request takes a JSON object with the id of the document to be removed
app.delete('/remove', (req, res) => {
  books.remove(req.body);
  res.status(200).send('Deleted!');
});

module.exports = app;
