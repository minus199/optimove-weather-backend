const express = require('express');
const {hostName,port} = require("./host")
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');

mongoose.connect('mongodb://localhost/optimove_weather', { useNewUrlParser: true });
const dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'connection error:'));

const app = express();
app.use(require("./middlewares"))

app.use('/api', apiRouter);

dbConn.once('open', function () {
    app.listen(port, () => console.info(`Server is up @ http://${hostName}:${port}`))
});
