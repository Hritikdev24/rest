const mongoose = require("mongoose");

async function dbConnect(databaseName) {
  const uri = `mongodb+srv://hritikGangadhar:Hritik@11@cluster0.rgkrs.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;
  
  try {
    await mongoose.connect(uri);
    console.log(`Connected to database: ${databaseName}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { dbConnect };
