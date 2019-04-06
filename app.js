const express = require('express');
const { hostName, port } = require("./host")
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const assert = require("assert");

['GITHUB_CID', 'GITHUB_SECRET', 'APIXUKEY'].forEach(envvar => {
    if (!process.env[envvar]) {
        console.error(`Please specify ${envvar} to boot server. Exiting...`);
        process.exit(1);
    }
})

mongoose.connect('mongodb://localhost/optimove_weather', { useNewUrlParser: true });
const dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'connection error:'));

const app = express();
app.use(require("./middlewares"))

app.use('/api', apiRouter);

dbConn.once('open', function () {
    app.listen(port, () => console.info(`Server is up @ http://${hostName}:${port}`))
});
