'use strict';
const { fork } = require('child_process');
const express = require('express');
const bodyParse = require('body-parser');
const router = require('./router.js');


const port = 8080;
const childUrl = 'process.js';

const app = express();
const child = fork(childUrl);


app.set('child', child);
app.use(bodyParse.json());
app.use('/api/v1',router);

app.listen(port);