const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1,
        maxlength: 30
    },
    ingredients: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },
    instructions: {
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
    type: {
        type: String,
        required: true,
        unique: false,
        default: "food"
    },
    difficulty: {
        type: String,
        required: true,
        unique: false,
        default: "3/5"
    },
}, {timestamps:true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;