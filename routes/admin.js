const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

//routing
//specific routes first, don't use next() if res.send is used

//to store the products that are being entered in the add-product page
const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  // console.log("In another middleware!");
  // //Following is not best approach because of the ../
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  // // use this instead and import helper function:
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));

  //WITH PUG
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "admin/add-product",
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true
  });
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
