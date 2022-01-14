const express = require('express');
const app = express();
const db = require('./database');
const path = require('path');
const port = 3000;

app.use(express.json());

app.listen(port, () => console.log('Server connected. Listening on port', port))