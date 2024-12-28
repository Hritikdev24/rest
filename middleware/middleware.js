const express = require("express");
const file = require("fs");
const path = require("path");
const multer=require("multer");
const sanitize = require('sanitize-filename');
// to capitalization middlware
function capitalizeMiddleware(req, res, next) {
  var productName = req.body.productName;
  productName = productName.charAt(0).toUpperCase() + productName.slice(1);
  req.body.productName = productName;
  console.log(productName);
  const productDescription = req.body.productDescription;
  var newString = "";
  var newArray = productDescription.split(" ");
  if (Array.isArray(newArray)) {
    newArray.map((item) => {
      item = item.charAt(0).toUpperCase() + item.slice(1);
      newString = `${newString} ${item}`;
      newString = newString.trim();
    });
  } else {
    newString =
      productDescription.charAt(0).toUpperCase() + productDescription.slice(1);
  }
  req.body.productDescription = newString.trim();
  console.log(newString);
  next();
}

// route request log
function logInfo(req, res, next) {
  const time = new Date();
  const fileUrl = path.join(__dirname, "../", "public", "data", "log.txt");
  var fileData = `\n${time.toLocaleDateString()}=>${time.toLocaleTimeString()}=>${
    req.originalUrl
  }=>${req.method}`;
  const record = file.appendFileSync(fileUrl, fileData);
  next();
}


// multer middleware to configure the file 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname);
    cb(null,"./public/uploads"); 
  },
  filename: (req, file, cb) => {
    const sanitizedFileName = sanitize(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(sanitizedFileName);
    const fileName = uniqueSuffix + fileExtension;
    cb(null,fileName); // Generate a unique filename
  },
});
const upload = multer({ storage: storage });





module.exports = { capitalizeMiddleware,logInfo,upload};
