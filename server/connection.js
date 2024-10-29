const mongoose = require("mongoose");

const connectDb = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  if (connection) {
    console.log("Database Is Connected");
  } else {
    console.log("Database Connection Is Failed");
  }
};

module.exports = connectDb;
