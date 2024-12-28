const express = require("express");
const { db, dbConnect } = require("../connection/connect.js");
const { user, product,file } = require("../model/model.js");
const path = require("path");
const multer=require("multer");
dbConnect("Project");
// for default route
async function home(req, res) {
  console.log("from home");
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "public", "html", "index.html"));
}
//for registration
async function newRegistration(req, res) {
  const { id, userName, password, email } = req.body;
  if (!id || !userName || !password || !email) {
    res.status(400).json({ msg: "all fields are compulsory" });
  } else {
    const existId = await user.findOne({ id: Number(id) });
    const existUserName = await user.findOne({ userName: userName });
    const existEmail = await user.findOne({ email: email });
    if (existId) {
      return res.status(402).json({ msg: "ID must be unique" });
    }
    if (existUserName) {
      return res.status(402).json({ msg: "Username must be unique" });
    }
    if (existEmail) {
      return res.status(402).json({ msg: "Email must be unique" });
    }
    const result = await user.create({
      id: Number(id),
      userName: userName,
      password: password,
      email: email,
    });
    res.status(201).json({ msg: "user created" });
  }
}
//login route
async function login(req, res) {
  const userName = req.body.userName;
  const password = req.body.password;
  if (!userName || !password) {
    res.status(400).json({ msg: "field are compulsory" });
  } else {
    const existUser = await user.findOne({ userName: userName });
    if (!existUser) {
      res.status(404).json({ msg: "not found" });
    } else {
      if (existUser.password == password) {
        res.status(201).json({ msg: "login successful" });
      } else {
        res.status(400).json({ msg: "password not matched" });
      }
    }
  }
}
//  ading Product Info
async function productInfo(req, res) {
  const { productId, productName, productDescription, productPrice } = req.body;
  if (!productId || !productName || !productPrice) {
    res.status(400).json({ msg: `all field are compulsory` });
  } else {
    const productOne = await product.findOne({ productId: Number(productId) });
    const productTwo = await product.findOne({ productName: productName });
    if (productOne) {
      res.status(400).json({ msg: "product id is already present" });
    } else if (productTwo) {
      res.status(400).json({ msg: "product name is alreaddy present" });
    } else {
      if (!productDescription) {
        const newProduct = product.create({
          productId: Number(productId),
          productName: productName,
          productPrice: Number(productPrice),
        });
        res.status(201).json({ msg: "product info created" });
      } else {
        const newProduct = product.create({
          productId: Number(productId),
          productName: productName,
          productDescription: productDescription,
          productPrice: Number(productPrice),
        });
        res.status(201).json({ msg: "product info created" });
      }
    }
  }
}
// fetching all register users
async function allUser(req, res) {
  const users = await user.find({});
  if (!users) {
    res.status(404).json({ msg: "no user found" });
  } else {
    res.status(200).json(users);
  }
}
// fetching perticular user
async function perUser(req, res) {
  const userName = req.params.userName;
  if (!userName) {
    res.status(400).json({ msg: "userName is compulsory" });
  } else {
    const result = await user.findOne({ userName: userName });
    // console.log(result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: "no message found" });
    }
  }
}
// product info modification
async function proModification(req, res) {
  const paramName = req.params.productName;
  console.log(paramName);
  const { productId, productName, productDescription, productPrice } = req.body;
  const newProduct = await product.findOne({ productName: paramName });
  if (!newProduct) {
    res.status(404).json({ msg: "product not found" });
  } else {
    const findProduct = await product.findOne({ productName: productName });
    if (findProduct) {
      res.status(400).json({ msg: "product is already present" });
    } else {
      if (productDescription) {
        const newDetail = await product.updateOne(
          { productName: paramName },
          {
            $set: {
              productName: productName,
              productDescription: productDescription,
              productPrice: productPrice,
            },
          }
        );
        res.status(200).json({ msg: "modification is done" });
      } else {
        const newDetail = await product.updateOne(
          { productName: paramName },
          {
            $set: {
              productName: productName,
              productPrice: productPrice,
            },
          }
        );
        res.status(200).json({ msg: "modification done" });
      }
    }
  }
}

// file uploader

async function fileUpload(req,res){
  console.log(req.file);
if (!req.file) {
  return res.status(400).send('file is compulsory');
}else{
  var newPath=`/uploads/${req.file.filename}`;
     const find=await file.findOne({userName:req.body.userName});
       if(!find){
        const result=file.create({
          userName:req.body.userName,
          file:newPath
        })
           res.status(200).json({"msg":"File Uploaded successfully"});
       }else{
          res.status(400).json({"msg":"userName should be unique"});
       }
  }
}
 
//displaying all the images 

async function displayImg(req,res){

  const img= await file.find({});
   if(!img){
    res.status(404).json({"msg":"images are not present"});
   }else{
    res.status(200).json(img);
   }
}


  

// exporting modules
module.exports = {
  home,
  newRegistration,
  login,
  productInfo,
  allUser,
  perUser,
  proModification,
  fileUpload,
  displayImg
};
