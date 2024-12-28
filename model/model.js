const { unique } = require("jquery");
const mongoose = require("mongoose");
// Defining The Schema For The Collection
// userSchema
const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
// productSchema
const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    productDescription: {
      type: String,
    },
    productPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const fileSchema=new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    unique:true
  },
  file:{
    type:String,
    required:true
  }
});


// registration model
const user = mongoose.model("register", userSchema);
// productInfo model
const product = mongoose.model("product", productSchema);
// file model
const file=mongoose.model('files',fileSchema);
module.exports = { user, product,file};
