//Allow for exporting of the module
module.exports = (req, res) => {
  //respond with the rendering of the register view
  res.render("register", {
    //Sending the stored data in req.flash method(Session) with the key 'registrationErros'
    //to the register view
    errors: req.flash("registrationErrors"),
    //Sending the first element of stored data in req.flash method(Session) with the key 'data' to the register view
    data: req.flash("data")[0]
  });
};
