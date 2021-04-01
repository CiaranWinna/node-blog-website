//Allowing the method to be exported into our app as a module
module.exports = (req, res) => {
  //If there is a userId present in our session then allow for user to access the create post page
  if (req.session.userId) {
    return res.render("create");
  }
  //Otherwize redirect user to the login in page
  res.redirect("/auth/login");
};
