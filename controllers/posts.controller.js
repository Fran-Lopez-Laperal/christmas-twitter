const createError = require("http-errors")
const mongoose = require("mongoose")
const User = require("../models/user.model");
const Post = require("../models/post.model");


module.exports.create = (req, res, next) => {
    const post = req.body;
    post.author = req.user.id 

    User.findById(req.user.id)
        .then(user => {
            if (user) {
                req.user = user;

                return Post.create(post)
                    .then(newPost => {
                            User.findByIdAndUpdate(req.user.id, { $push: { posts: newPost.id } }, { new: true })
                                .then(updatedUser => {
                                    res.redirect(`/users/${req.user.id}`)
                                }) 
                        })
            } else {
                next(createError(404, 'user not found'))
            }
        }).catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('users/detail', {
                    post, 
                    errors: error.errors,
                    user: req.user
                })
            } else {
                next(error)
            }
            
        });
       
}


