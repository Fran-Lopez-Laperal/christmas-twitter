const createError = require('http-errors')
const mongoose = require("mongoose")
const Post = require('../models/post.model');
const User = require('../models/user.model');




//
module.exports.list = (req, res, next) => {
    User.find()
        .then((users) => {
            res.render("users/list", { users });
        })
        .catch((error) => {
            next(error);
        });
};




module.exports.profile = (req, res, next) => {
    User.findById(req.params.id)
        .populate('posts')
        .then((user) => {
            if (user) {
                res.render("users/profile", { user })
            } else {
                next(createError(404, 'User not found'))
            }
        })
        .catch((error) => next(error))
};


module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (user) {
                res.redirect("/");
            } else {
                next(createError(404, 'user not found'))
            }

        })
        .catch((error) => next(error));
};

