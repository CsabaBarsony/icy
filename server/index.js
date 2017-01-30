'use strict';

const express    = require('express');
const db         = require('./db');
const portNumber = 3000;

const app     = express();

app.use(express.static('public'));

app.get('/getallfoods', function (req, res) {
    res.send(db.getAllFoods());
});

app.get('/getfood/:id', function(req, res) {
    res.send(db.getFood(req.params.id));
});

app.get('/queryfood/:text', function(req, res) {
    res.send(db.queryFood(req.params.text));
});

app.listen(portNumber, function () {
    console.log('App listening on port ' + portNumber + '...');
});
