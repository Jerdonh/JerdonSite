const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfully");
});

const recipesRouter = require('./routes/recipes');
const jweetsRouter = require('./routes/jweets');
const aboutSiteRouter = require('./routes/aboutSite');
const blogRouter = require('./routes/blog');

//Routes
app.use('/recipes', recipesRouter);
app.use('/jweets', jweetsRouter);
app.use('/blog', blogRouter);
app.use('/uploads',express.static('uploads'));
app.use(express.static('uploads'));

// Serve static assets if in prod
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('jerdonsite/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'jerdonsite','build','index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is running on port:', port);
});