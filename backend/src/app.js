const express = require('express');
const path = require('path');
const exp = require('constants');
const Router = require('./routes');
const { initDatabase } = require('./lib/database.js');
const PORT = process.env.PORT || 3000;

initDatabase();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', Router);

app.listen(PORT);

console.log('-------------');
console.log('listeneing ... ' + PORT);
console.log('-------------');

module.exports = app;
