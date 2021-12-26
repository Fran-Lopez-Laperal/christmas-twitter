const expressSession = require("express-session");
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo");
const User = require('../models/user.model');


const session = expressSession({
    secret: process.env.SSESION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: process.env.SSESION_SECURE === 'true',

    },
    store: new MongoStore({
        client: mongoose.connection.getClient(),
        ttl: 3600
    })
})


module.exports.session = session
module.exports.loadUser = (req, res, next) => {
    const { userId } = req.session;
    if (userId) {
        User.findById(userId)
            .then(user => {
                req.user = user;
                res.locals.currentUser= user;
                next();
            }).catch(error => next(error))

    } else {
        next()
    }

}
