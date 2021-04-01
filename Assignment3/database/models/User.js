//Importing the required packages
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//Creating a new mongoose Schema for User
const UserSchema = new mongoose.Schema({
  //Attribute
  username: {
    //Datatype
    type: String,
    //Making it required, if not given the second parameter will be diplayed
    required: [true, "Please provide your username."]
  },
  //Attribute
  email: {
    //Datatype
    type: String,
    //The email must be unique
    unique: true,
    //Making the email required and displaying the second parameter if not given
    required: [true, "Please provide your email."]
  },
  //Attribute
  password: {
    //Datatype
    type: String,
    //Making it required and if not given the second parameter will be printed
    required: [true, "Please provide your password."]
  }
});

//Before mongoose saves the user into the database, perform this section of code
UserSchema.pre("save", function(next) {
  //Storing the user instance in varible user
  const user = this;
  //Calling the hash method from bcrypt and passing the password attribute of the user instance, setting the encryption level to 10
  //Adding the callback which takes an error and encrypted arguments
  bcrypt.hash(user.password, 10, (error, encrypted) => {
    //Setting the password attribute of the instance to the returned ecrypted value
    user.password = encrypted;
    //Calling the next method to say that the script can continue to the next code segment
    next();
  });
});

//Exporting the module of User which uses the UserSchema as its data structure
module.exports = mongoose.model("User", UserSchema);
