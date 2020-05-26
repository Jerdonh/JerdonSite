const router = require('express').Router();
let Jweet = require('../models/jweet.model');

router.route('/').get((req, res) => {
    Jweet.find()
        .then(jweets => res.json(jweets))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/').post((req, res) => {
    const name = req.body.name;
    const message = req.body.message;
    //const likes = Number(req.body.likes);
    //const date = Date.parse(req.body.date);

    const newJweet = new Jweet({name,message});

    newJweet.save()
    .then(() => res.json('Jweet added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const message = req.body.message;
    //const likes = Number(req.body.likes);
    //const date = Date.parse(req.body.date);

    const newJweet = new Jweet({name,message});

    newJweet.save()
    .then(() => res.json('Jweet added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Jweet.findById(req.params.id)
    .then(jweet => res.json(jweet))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/:id').delete((req, res) => {
    Jweet.findByIdAndDelete(req.params.id)
    .then(jweet => res.json(jweet))
    .catch(err => res.status(400).json('Error: ' +err));
});


router.route('/update/:id').post((req, res) => {
    Jweet.findById(req.params.id)
    .then(jweet => {
        jweet.likes = Number(req.body.likes);

        jweet.save()
        .then(() => res.json("Jweet Updated"))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
});


module.exports = router;