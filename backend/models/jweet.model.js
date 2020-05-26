const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jweetSchema = new Schema({
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
    likes: {
        type: Number,
        required: true,
        unique: false,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        unique: false,
        default: Date.now()
    },
}, {timestamps:true,
});


const Jweet = mongoose.model('Jweet', jweetSchema);
module.exports = Jweet;