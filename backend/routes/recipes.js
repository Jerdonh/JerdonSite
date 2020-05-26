const router = require('express').Router();
let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    //const likes = req.body.likes;
    //const date = req.body.date;

    const newRecipe = new Recipe({name,ingredients,instructions});

    newRecipe.save()
    .then(() => res.json('Recipe added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' +err));
});
router.route('/update/:id').post((req, res) => {
    Recipe.findById(req.params.id)
    .then(recipe => {
        //recipe.name = req.body.name;
        //recipe.ingredients = req.body.ingredients;
        //recipe.instructions = req.body.instructions;
        recipe.likes = Number(req.body.likes);

        recipe.save()
        .then(() => res.json("Recipe Updated"))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;