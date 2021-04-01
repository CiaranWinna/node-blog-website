const path = require('path')
const expressEdge = require('express-edge')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')
//new
//const fileUpload = require('express-fileupload');


const app = new express()

mongoose.connect("mongodb://localhost/2940836_Assignment3", { useNewUrlParser: true })

app.use(express.static('public'))
app.use(expressEdge)
//new
//app.use(fileUpload)

app.set('views', `${__dirname}/views`);
app.get(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//---------------------Routes----------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts
    })
})

app.get('/posts/new', (req, res) =>{
    res.render('create')
})

app.get('/post', (req,res) =>{
    res.render('post')
})

app.post("/posts/store", (req, res) => {
    
    const {image} = req.files
    
    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        
        Post.create({
            ...req.body,
            image: '/posts/${image.name}'
        }, (error, post) => {
            res.redirect("/");
        })
    
    })
})


/*app.get('/about', (req, res) => {
    res.render('about')
})*/

app.listen(4000, () => {
    console.log('App listening at port 4000')
})