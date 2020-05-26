const router = require('express').Router();
let BlogPost = require('../models/blog.model');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/../../public/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpeg'){
        //accept a file;
        cb(null, true);
    }
    else{
        //reject a file
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {},
    fileFilter: fileFilter
});

router.route('/').get((req, res) => {
    BlogPost.find()
        .then(blogPosts => res.json(blogPosts))
        .catch(err => res.status(400).json('Error: '+err));
});

//Eventually will replace the normal get with this and only get the most recent 20 blog posts
router.route('/recent').get((req, res) => {
    BlogPost.find()
        .then(blogPosts => res.json(blogPosts))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/').post(upload.single('image'),(req, res) => {
    console.log("POST:",req.file);
    const name = req.body.name;
    const message = req.body.message;
    if(req.file){var image = req.file.path;}
    else{var image = "";}
    const tags = req.body.tags;
    
    

    const newBlogPost = new BlogPost({name,message,image,tags});

    newBlogPost.save()
    .then(() => res.json('Blog Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//OG blog post
// router.route('/').post((req, res) => {
//     const name = req.body.name;
//     const message = req.body.message;
//     const image = req.body.image;
//     const tags = req.body.tags;
//     //const likes = req.body.likes;
//     //const date = req.body.date;

//     const newBlogPost = new BlogPost({name,message,image,tags});

//     newBlogPost.save()
//     .then(() => res.json('Blog Post added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;