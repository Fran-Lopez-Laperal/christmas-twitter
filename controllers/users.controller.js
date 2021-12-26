const User = require('../models/user.model');

module.exports.profile = (req, res, next) => {
    res.render('users/profile')
}