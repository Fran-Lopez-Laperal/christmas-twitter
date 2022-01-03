const createError = require("http-errors");
const User = require("../models/user.model");
const mongoose = require("mongoose");

module.exports.register = (req, res, next) => {
    res.render('auth/register')
}


module.exports.doRegister = (req, res, next) => {
    function renderWhithErrors(errors) {
        res.render("auth/register"), {
            errors: errors,
            user: req.body
        }
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {

                return User.create(req.body)
                    .then(user => res.redirect("/login"))
            } else {
                renderWhithErrors({ email: 'email already exists' })
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWhithErrors(error.errors)
            } else {
                next(error)
            }
        })
}


module.exports.login = (req, res, next) => {
    res.render('auth/login')
};

module.exports.doLogin = (req, res, next) => {

    function renderWhithErrors() {
        res.render("auth/login", {
            user: req.body,
            errors: { password: 'email or password incorrect' }
        })
    }

    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                renderWhithErrors()
            } else {
                return user.checkPassword(password)
                    .then(match => {
                        if (!match) {
                            renderWhithErrors()
                        } else {
                            //cookie de sesion
                            req.session.userId = user.id
                            
                            res.redirect("/")
                        }
                    })
            }
        })
        .catch(error => next(error))

}


module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
}







