//Allowing the method to be exported into our app as a module
module.exports = (req, res) => {
  //Responding with the render of the contact.edge page
  res.render("contact");
};
