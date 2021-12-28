const createError = require("http-errors")
const mongoose = require("mongoose")
const User = require("../models/user.model");
const Post = require("../models/post.model");

module.exports.doDetail = (req, res, next) => {
    const { userId } = req.params;
    const post = req.body;
    post.user = req.user.id

    User.findById(req.user)
        .then(user => {
            if (user) {
                req.user = user;
                return Post.create(post)
                    .then(post => res.redirect(`/users/${userId}`))
            } else {
                next(createError(404, 'user not found'))
            }
        }).catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('users/detail', {
                    post, errors: error.errors,
                   user: req.user
                })
            } else {
                next(error)
            }
            
        });
       
}