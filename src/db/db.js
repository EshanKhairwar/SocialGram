const mongoose = require("mongoose");

function connectDb() {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB Connected Successfully");
  });
}

module.exports = connectDb;
