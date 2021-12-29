const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Text is requred'],
        maxlength: [200,'200 chars maximun']
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'contact id is required']
    },

    likes: {
        type: Number,
        default: 0,
    },

}, { timestamps: true })


const Post = mongoose.model("Post", postSchema);
module.exports = Post;