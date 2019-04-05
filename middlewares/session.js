const session = require('express-session')
const passport = require("passport")
const FileStore = require('session-file-store')(session);
const gitHubStrategy = require("../service/auth/github-strategy")
const { User } = require("../models")
module.exports = [
    session({
        store: new FileStore(),
        secret: 'some_weird_key',
        resave: false,
        saveUninitialized: false
    }),
    passport.initialize(),
    passport.session()
]

passport.use(gitHubStrategy);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    User.findById(user._id, done)
});