
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /.{8,}/;
const SALT_WORK_FACTOR = 10;

const schema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Username is required"],
            minlength: [4, "Username needs at last 4 chars"],
        },

        email: {
            type: String,
            required: [true, "email is required"],
            match: [EMAIL_PATTERN, "email is not valid"],
            trim: true,
            lowercase: true,
            unique: true
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password needs at last 8 chars"],
            trim: true,
            match: [PASSWORD_PATTERN, "Password is not valid"],

        },

        avatar: {
            type: String,
            required: [true, "Avatar is required"],
            default: 'https://i.pravatar.cc/300',
        },

        bio: {
            type: String,
        },
    }, { timestamp: true }

);

//no utilizar nunca aqui una funcion flecha porque el usuario es this y las funciones flecha no tienen this
schema.pre('save', function (next) {
    const user = this;
    
    if (user.isModified('password')) {
        bcrypt.hash(user.password, SALT_WORK_FACTOR)
            .then(hash => {
                user.password = hash;
                next();
            })
            .catch(error => next(error))
    } else {
        next()
    }
})

schema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password)
}


const User = mongoose.model("User", schema);
module.exports = User;
