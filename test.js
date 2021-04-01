const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect("mongodb://localhost/post_test_db", { useNewUrlParser: true })

/*Post.create({

    title: 'My first blog post',
    description: 'Blog post description',
    content: 'content in my first blog post'

} , function(error, post){
    console.log(error, post)
})*/

Post.find({
    title: 'M'
})

