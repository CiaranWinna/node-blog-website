// Import the required modules
const Post = require("../database/models/Post");

//Allow for module exporting
module.exports = (req, res) => {
  //Find a Post with the passed id and delete it from the database
  Post.findByIdAndDelete(req.body._id, (error, post) => {
    //Redirect to the index page
    res.redirect("/");
  });
};
