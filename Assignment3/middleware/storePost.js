//Allow for module exporting
module.exports = (req, res, next) => {
  //If the req.body elements are not filled out by the user
  if (
    !req.files ||
    !req.body.title ||
    !req.body.subtitle ||
    !req.body.content
  ) {
    //Redirect the user the new posts page
    return res.redirect("/post/new");
  }
  //Tell the script to move on to the next code block up for execution
  next();
};
