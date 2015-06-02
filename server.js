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

app.delete('/api/notes/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.notes.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
    res.json(docs);
  });
});

app.get('/api/notes/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.notes.findOne({_id: mongojs.ObjectId(id)}, function(err, docs) {
    res.json(docs);
  });
});

app.put('/api/notes/:id', function(req, res) {
  var id = req.params.id;
  console.log(req.body.author);
  db.notes.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set:{note: req.body.note, author: req.body.author}},
    new: true}, function(err, docs) {
      res.json(docs)
    });
});

});

app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});


