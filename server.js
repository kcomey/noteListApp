'use strict';

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('notesdb', ['notes']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/api/notes', function(req, res) {
  console.log('GET request received');

  db.notes.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  });

app.post('/api/notes', function(req, res) {
  console.log(req.body);
  db.notes.insert(req.body, function(err, docs) {
    res.json(docs);
  });
});


});

app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});


