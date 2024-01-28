const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id:{
        type: String,
    },
    username: {
      type: String,
      min: 3,
      required: true,
      unique: true,
    },
    firstName: {
        type: String,
    },
    otherNames: {
        type: String,
    },
    provider: {
        type: String,
    },
    msisdn:{
        type: String,
        min: 3,
        max: 14,
        required: true,
    },
    password:{
        type: String,
    },
    countryCode:{
        type: String,
        uppercase:true,
        default: "GH",
    },
    isoCode:{
        type: String,
        default: "233",
    },
    email: {
      type: String,
      unique: true,
    },
    gender: {
        type: String
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
