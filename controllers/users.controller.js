
const { populate } = require('../models/user.model');
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
                res.render("users/detail", { user })
            } else {
                res.redirect("/profile")
            }
        })
        .catch((error) => {
            next(error);
        });
};


module.exports.delete =( req, res, next) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect("/");
    })
    .catch((error) => {
        next(error)
    });
};
