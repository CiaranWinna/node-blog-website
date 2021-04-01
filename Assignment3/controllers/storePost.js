//Import the required modules
const Post = require("../database/models/Post");
const path = require("path");

//Allow for module exporting
module.exports = (req, res) => {
  //Store the posted image in the {image} variable
  const { image } = req.files;

  //Move the posted image to the 'public/posts' directory with the name given by image.name
  image.mv(path.resolve(__dirname, "..", "public/posts", image.name), error => {
    //Create a new Post entry in the Post collection
    Post.create(
      {
        //Use the req.body elements from the post request as inputs to the collection
        ...req.body,
        //Save the image attribute as the full directory, allows for easier access on the view page
        image: `/posts/${image.name}`,
        //Set the author to the current session's userId
        author: req.session.userId
      },
      //Callback
      (error, post) => {
        //Redirect to the main page
        res.redirect("/");
      }
    );
  });
};
