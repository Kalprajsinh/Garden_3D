const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/garden', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to Database"))
.catch((error) => console.log("Error in Connecting to Database:", error));

const User = mongoose.model("user", {
  name: String,
  email: String,
  password: String,
  refreshToken: String
});


const Plant = mongoose.model("plant", {
    email: String,
    plantname: String,
    description: String
  });
  
  
module.exports = {User , Plant};