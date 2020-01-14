// // Built in / core modules
//Following not necessary when using express
// const http = require("http");
const path = require("path");

//Third party packages
const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

//Own modules
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const rootDir = require("./util/path");

//create express application
//the function express() creates sort of object so express js can help us / work behind the scene
const app = express();

// -------------------------------------------------------
// PUG
// //To use templating engine pug use app.set (pug is kinda built in)
// app.set("view engine", "pug");

//to tell express where to find the views
//default location is project-main-directory/views
//Following not necessary:
// app.set("views", "views");
// -------------------------------------------------------
// HANDLEBARS
// First, install with:
// npm install --save express-handlebars@3.0
// And require express-handlebars
//To use handlebars, use app.engine, give name and call function
// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts",
//     defaultLayout: "main-layout",
//     extname: "hbs"
//   })
// );
// app.set("view engine", "hbs");
// -------------------------------------------------------
// EJS
app.set("view engine", "ejs");
app.set("views", "views");

// //app can be passed to createServer as arg, but needs middleware in order to do something
// //to use middleware, use use() with req, res and next (function) as args
// //next() allows the app to continue to the next middleware
// //Use next() if we don't send a response
// app.use((req, res, next) => {
//   console.log("In the middleware!");
//   next();
// });

//to prevent GET favicon
app.get("/favicon.ico", (req, res, next) => res.status(204));

// //For middleware that should always run, put at the top, no path as arg or only "/"
// //use next()
// app.use((req, res, next) => {
//   console.log("This will always run");
//   next();
// });

//To use body-parser:
app.use(bodyParser.urlencoded({ extended: false }));

//To load static content, content that will be visible to the public (like stylesheets etc)
app.use(express.static(path.join(__dirname, "public")));

//Run the admin routes
app.use("/admin", adminData.routes);

//send response in the last middleware function:
app.use(shopRoutes);

//set 404 not found page
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
});

// // without express:
// const server = http.createServer(app);
// server.listen(3000)

//With express
app.listen(3000);
