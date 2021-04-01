//Import the required modules
const Post = require("../database/models/Post");
const path = require("path");

//Allow for exporting of the module
module.exports = (req, res) => {
  //Store the image that is sent by the post request
  const { image } = req.files;

  //Move the chosen image to the posts directory based int he public folder
  image.mv(path.resolve(__dirname, "..", "public/posts", image.name), error => {
    //Find Post by the provided id
    Post.findByIdAndUpdate(
      //The passed id that need to be modified
      req.body._id,
      {
        //The attributes in the body of the request that needs to be changed in the searched Post in the database
        ...req.body,
        //Set the path of the image field in the database to the passed image directory
        image: `/posts/${image.name}`,
        //Set the author attribute to that of the session's user ID
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
