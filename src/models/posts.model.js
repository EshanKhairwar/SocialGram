const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: String,
  caption: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
},{
  timestamps:true,
});

const postModel = mongoose.model("posts", postSchema);

module.exports=postModel