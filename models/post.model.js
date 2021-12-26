const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Text is requred']
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'contact id is required']
    }

}, { timestamp: true })


const Post = mongoose.model("Post", postSchema);
module.exports = Post;