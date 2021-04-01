//Import the required modules
const User = require("../database/models/User");
const bcrypt = require("bcrypt");

//Allow for module exporting
module.exports = (req, res) => {
  //create two constants and set them to the contents of the requests body elements
  const { email, password } = req.body;
  //try to find the user via the user's unique email
  User.findOne({ email: email }, (error, user) => {
    //If the user is found
    if (user) {
      //Compare the encrypted request password from the body and the stored database password
      bcrypt.compare(password, user.password, (error, same) => {
        //If they are the same
        if (same) {
          //set the session's userId to that of the returned _id from the 'user' variable
          req.session.userId = user._id;
          //Redirect to the main page
          res.redirect("/");
          //If the passwords are not the same
        } else {
          //Redirect the user to the login page
          res.redirect("/auth/login");
        }
      });
      //If there is no user matching the passed password in the database
    } else {
      //Redirect the user to the login page
      return res.redirect("/auth/login");
    }
  });
};
