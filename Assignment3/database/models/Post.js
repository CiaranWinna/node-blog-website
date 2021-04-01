//Import the required modules
const mongoose = require("mongoose");

//Creating a new mongoose schema
const PostSchema = new mongoose.Schema({
  //Attributes of the Schema along with there datatype
  title: String,
  subtitle: String,
  content: String,
  author: {
    //The special type belonging to mongoose which will be the object id of the individual documents saved
    //in the database
    type: mongoose.Schema.Types.ObjectId,
    //The reference for the objectId above will be the User collection from user.js
    ref: "User",
    //This attribute will be required when using this Schema
    required: true
  },
  image: String,
  createdAt: {
    //Setting the datatype
    type: Date,
    //The date attribute will automatically be assigned the current date as default
    default: new Date()
  }
});

//Storing in the Post variable, a model with the key of Post that uses the PostSchema
const Post = mongoose.model("Post", PostSchema);

//Allowing for the Post variable to be exported
module.exports = Post;
