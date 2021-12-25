const User = require('../models/user.model');

module.exports.register = (req, res, next) => {
    res.render("users/register")
}

