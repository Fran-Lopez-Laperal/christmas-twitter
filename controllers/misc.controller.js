const createError = require("http-errors");
const User = require("../models/user.model");
const Post =require("../models/post.model")
const mongoose = require("mongoose");


module.exports.home = (req, res, next) => {
    res.render("misc/home")
}


