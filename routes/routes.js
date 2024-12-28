const express = require("express");
const router = express.Router();
const{capitalizeMiddleware,logInfo, upload}=require("../middleware/middleware.js");
const {
  home,
  newRegistration,
  login,
  productInfo,
  allUser,
  perUser,
  proModification,
  fileUpload,
  displayImg
} = require("../controller/controller.js");
// for default res
router.use(logInfo);
router.get("/", home);
//for registration
router.post("/register", newRegistration);
//for login
router.post("/login", login);
//for adding info
router.post("/info",capitalizeMiddleware, productInfo);
//for fetching all user
router.get("/users", allUser);
//for perticular user
router.get("/user/:userName", perUser);
//for all  info of perticular user
router.patch("/editInfo/:productName",capitalizeMiddleware, proModification);
// upload the image
router.post("/upload",upload.single('file'),fileUpload);
//watching all images
router.get("/images",displayImg)
// exporting routes
module.exports = { router };
