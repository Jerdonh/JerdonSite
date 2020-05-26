const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1,
        maxlength: 20
    },
    message: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },
    image: {
        type: String,//File
        default: "",
        required: false
    },
    tags: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        default: "All"
    }
}, {timestamps:true,
});


const BlogPost = mongoose.model('Blog', blogSchema);
module.exports = BlogPost;