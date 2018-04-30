const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./app/routes');
const { apiPort, dbURL } = require('./config/app');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

mongoose.connect(dbURL).then(
    () => app.listen(apiPort, console.log(`Listening on port ${apiPort}...`)),
    err => {
        console.log(err);
        process.exit();
    }
);