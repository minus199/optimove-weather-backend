const express = require('express');
const apiRouter = express.Router();

const userRouter = require("./users")
const autosuggestRouter = require("./autosuggest")
const citiesRouter = require("./cities")
const authRouter = require("./auth")

apiRouter.use("/auth", authRouter)
apiRouter.use("/autosuggest", autosuggestRouter)
apiRouter.use("/users", userRouter)
apiRouter.use("/cities", citiesRouter)

apiRouter.get('/', function (req, res, next) {
  res.send('Base endpoint');
});

module.exports = apiRouter;
