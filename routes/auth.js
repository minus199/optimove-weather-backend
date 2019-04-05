const express = require('express');
const authRouter = express.Router();
const passport = require("passport")

authRouter.get('/github', passport.authenticate('github'));
authRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/?error=login' }),
    function (req, res) {
        res.redirect(`/?login=success&cities=${req.user.defaultCities}`);
    });


module.exports = authRouter