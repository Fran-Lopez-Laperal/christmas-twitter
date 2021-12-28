const createError = require('http-errors')
const mongoose = require("mongoose")
const Post = require('../models/post.model');
const User = require('../models/user.model');




//
module.exports.profile = (req, res, next) => {
    User.find()
        .then((users) => {
            res.render("users/profile", { users });
        })
        .catch((error) => {
            next(error);
        });
};



module.exports.detail = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                return Post.find({ user: req.params.id })
                    .then(posts => res.render("users/detail", { user, posts }))
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
                res.redirect(`/users`);
            } else {
                next(createError(404, 'user not found'))
            }

        })
        .catch((error) => next(error));
};
