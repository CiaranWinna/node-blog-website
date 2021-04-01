//Import the required modules
const User = require("../database/models/User");

//Allow for module exporting
module.exports = (req, res) => {
  //Create a new user by creating a new entry into the User collection
  User.create(req.body, (error, user) => {
    //If there is a error given
    if (error) {
      //storing the errors returned in a list format - returns the message along with the key of the error in the list
      const registrationErrors = Object.keys(error.errors).map(
        key => error.errors[key].message
      );
      //Calling the flash method on the req, this will take in the 1st argument of the key
      //registrationErrors and the 2nd argument that assigns the data of registrationerrors to the key
      req.flash("registrationErrors", registrationErrors);
      // Set a flash message by passing the data key, followed by the attributes in the req.body, to req.flash()
      req.flash("data", req.body);
      //Return a response for redirecting to the registration page
      return res.redirect("/auth/register");
    }
    //If successful, redirect to the main page
    res.redirect("/");
  });
};
