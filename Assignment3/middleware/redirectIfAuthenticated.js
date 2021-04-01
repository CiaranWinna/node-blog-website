//Allows for exporting of module
module.exports = (req, res, next) => {
  //If theie is a userId in the session information
  if (req.session.userId) {
    // Return a redirect for the response to the main page
    return res.redirect("/");
  }
  //Tell the script to move on the next code block for execution
  next();
};
