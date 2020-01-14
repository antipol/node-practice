const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

//send response in the last middleware function:
router.get("/", (req, res, next) => {
  // console.log("In another middleware!");

  //the data (array with objects) is stored on the node server
  //Not good, is visible to all users and in all browsers as long as the server is running
  console.log(adminData.products);

  // To serve file without creating util variable to find absolute path
  // __dirname is global variable made available by node
  //Holds the absolute path from OS root folder to this project and current directory
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"));

  // // With the rootDir variable:
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  //with PUG
  //extension not needed because we defined pug as templating engine
  //To pass in data dynamically, create variable that gets data from req.body
  const products = adminData.products;

  //pass that variable as 2nd arg as object with the variable as value:
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });

  //To access the variable go to PUG file and target like object with dot notation
});

module.exports = router;
