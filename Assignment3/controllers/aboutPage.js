//Allowing the method to be exported into our app as a module
module.exports = (req, res) => {
  //Responding with the render of the about.edge page
  res.render("about");
};
