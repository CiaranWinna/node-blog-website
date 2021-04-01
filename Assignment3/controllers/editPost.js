//Import the required modules
const Post = require("../database/models/Post");

//Allow for exporting of the module
module.exports = async (req, res) => {
  // Store the post found by it's id and populate the username with author
  const post = await Post.findById(req.params.id).populate("author");
  //Render the 'edit-post' view and pass the post variable to the view
  res.render("edit-post", {
    post
  });
};
