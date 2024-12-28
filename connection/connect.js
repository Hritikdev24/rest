const mongoose = require("mongoose");

async function dbConnect(collection) {
  return await mongoose.connect(`mongodb://localhost:27017/${collection}`);
}


module.exports={dbConnect};