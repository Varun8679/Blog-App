const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://varun123070:varun338081@cluster0.06kjt.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () => {
  const connection = await mongoose.connect(MONGO_URI);
  if (connection) {
    console.log("Database Is Connected");
  } else {
    console.log("Database Connection Is Failed");
  }
};

module.exports = connectDb;
