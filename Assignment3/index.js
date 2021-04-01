//------ Importing the environment variables ------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
require("dotenv").config();

//------ Imported Packages ------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");
const edge = require("edge.js");
const helmet = require("helmet");
//------ Controllers ------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
// Importing the controller scripts for the blog
const createPostController = require("./controllers/createPost");
const homeController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const aboutPageController = require("./controllers/aboutPage");
const contactPageController = require("./controllers/contactPage");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const editPostController = require("./controllers/editPost");
const editStoreController = require("./controllers/edit-store");
const deletePostController = require("./controllers/deletePost");

//------ Generating an new instance of an express app and store it in app------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
const app = new express();

//------ Creating and connecting to the database ------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
//Using mongoose to connect to mongodb by passing the databse uri from the .env file and setting the userNewUrlParser to true
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

//------ Session Management ------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
//Creating a variable that will be used to create a new session collection in the database to store session information
const mongoStore = connectMongo(expressSession);
app.use(
  expressSession({
    //Used for the hashing of the session, this should always be changed from the default
    secret: process.env.EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    //store the session information into the database that has been created above
    store: new mongoStore({
      /*Uses the current mongoose connection made above as the connection to store the session information
      this will allow for persistence for the users*/
      mongooseConnection: mongoose.connection,
      //Auto remove expired sessions
      autoRemove: "interval",
      //Auto remove expired sessions every 30 minutes
      autoRemoveInterval: 30
    })
  })
);
//Package that adds some security features
app.use(helmet());
//The app will use a package which will be used to store messages in the session to display them to the user
app.use(connectFlash());
//The app will use a package that will be used for upload images to the database image directory
app.use(fileUpload());
//The app will use the express.static method to state which directory the assets for the website will be stored
app.use(express.static("public"));
//The app wil user expressEdge as the templating engine
app.use(expressEdge);
//Setting the directory of the views for the app, with the key of views and the second argument of the directory path
app.set("views", `${__dirname}/views`);
app.use("*", (req, res, next) => {
  //Creating a global variable of 'auth' that will use the session's login id of the user
  edge.global("auth", req.session.userId);
  //Telling the script to go to the next code block
  next();
});
//The app will user the json method of the bodyParser package
app.use(bodyParser.json());
//The app will use the urlencoded method of the bodyParser package and sets the parameter of extended to true
app.use(bodyParser.urlencoded({ extended: true }));

//----- Middleware ------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
//Requiring the middleware scripts that will be used in the routes section below
const storePost = require("./middleware/storePost");
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

//------ Routes ------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
//This section handles requests(Get/Post) to the server.The first argument will be the directory that the request will
//Be received from and then the subsequent arguments will be the scripts that need to run in order to handle the requests.
//If a method below has more than two arguments, it means that their are middleware scripts being used
app.get("/", homeController);
app.get("/post/new", auth, createPostController);
app.post("/post/store", auth, storePost, storePostController);
app.get("/post/:id", getPostController);
app.get("/contact", contactPageController);
app.get("/about", aboutPageController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/logout", auth, logoutController);
app.post("/post/edit/:id", editPostController);
app.post("/post/edit-store", editStoreController);
app.post("/post/delete", deletePostController);
//If no other routes were used for the incoming request, then the user will be directed to a 404 not-found page
app.use((req, res) => {
  res.render("not-found");
});

//------ Listening Port ------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
//Using the app.listen method which will take in the argument from the .env file to add more security. The callback which will
//log the port that is app is listening to.
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
