const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const exp = require('constants');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send('Hello Hi~~~~~~~~');
})

app.listen(PORT);

console.log("-------------");
console.log("listeneing ... " + PORT);
console.log("-------------");

module.exports = app;