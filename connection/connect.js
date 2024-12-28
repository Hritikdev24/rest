const mongoose = require("mongoose");

async function dbConnect(collection) {
  return await mongoose.connect(`mongodb+srv://hritikdev24:Hritik@11@cluster0.rgkrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${collection}`);
}


module.exports={dbConnect};