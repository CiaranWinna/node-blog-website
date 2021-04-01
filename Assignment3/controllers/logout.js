//Allow for module exporting
module.exports = (req, res) => {
  //Destroy the current session
  req.session.destroy(() => {
    //Log to the console that the user logged out
    console.log("You have logged out");
    //Redirect to the main page
    res.redirect("/");
  });
};
