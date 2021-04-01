//Import the required packages
const Post = require("../database/models/Post");

//Allow for module exporting
module.exports = async (req, res) => {
  // Store the post found by it's id and populate the username with author
  const post = await Post.findById(req.params.id).populate("author");
  //Render the 'post' view and pass the post variable to the view
  res.render("post", {
    post
  });
};
