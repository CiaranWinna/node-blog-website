//Importing the required modules
const User = require("../database/models/User");

//Allow for module exporting
module.exports = (req, res, next) => {
  //Find a 'User' entry by the id sent in the stored request session's userId
  User.findById(req.session.userId, (error, user) => {
    //If an error is returned or the the request does not find a match
    if (error || !user) {
      //Return the user to the main page
      return res.redirect("/");
    }
    //Tell the script to move onto the next code block =
    next();
  });
};
