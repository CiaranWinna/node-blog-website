//Import the required packages
const Post = require("../database/models/Post");

//Allow for module exporting
module.exports = async (req, res) => {
  // Store the post found by it's id and populate the username with author
  const posts = await Post.find({}).populate("author");
  //Render the 'index' view and pass the post variable to the view
  res.render("index", {
    posts
  });
};
