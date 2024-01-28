const userModel = require("../models/userModel.js");
// const { createUserTokens } = require("../routes/authController");


const findUser = async (req, res) => {
  try {
    // Find a user by the provided email
    const username= req.body.username;
    const user = await userModel.findOne({ username });
    if (user) {
      res.status(200).json({user,});
    }
    return null;
  } catch (error) {
    res.json({ message: "Error finding the user" });
  }
};

//GET list of all users
const listAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({users, message:"USERSSSSSSSSSS"});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server error" });
  }
};



const changePassword = async (req, res) => {
  const { oldPassword, newPassword, username } = req.body;
  const user = await userModel.findOne({username});

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  }
  
  if (user.password !== oldPassword) {
    return res.status(400).json({
      success: false,
      message: "Old Password is incorrect",
    });
  }

  user.password = newPassword;
  await user.save();

  return res.json({
    success: true,
    message: "Password Changed Successfully!",
  });
};

const loginUser = async (req, res) => {
  const { username, password,
    //  token
     } = req.body;

  // const user = await findUser(username);
  const user = await userModel.findOne({username});
  if (user?.password !== password) {
      return res.status(401).json({ message: "Incorrect username or password" });
  }

  if (user) {
    res.status(200).json({
      user,
      // tokens: await createUserTokens({
      //   username: username,
      // }),
    });
  } else {
    res.status(400).json({ message: "User not found" });
  }
};




const registerUser = async (req, res) => {
 
  const { username, firstName, otherNames, provider, msisdn, password, countryCode, isoCode, email, gender } = req.body;


  const entityObject = {};

  if (!username || !msisdn || !password) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  // Field Validation
  if (username) {
    entityObject.username = username;
  }

  if (firstName) {
    entityObject.firstName = firstName;
  }

  if (otherNames) {
    entityObject.otherNames = otherNames;
  }

  if (provider) {
    entityObject.provider = provider;
  }

  if (msisdn) {
    entityObject.msisdn = msisdn;
  }

  if (password) {
    entityObject.password = password;
  }

  if (countryCode) {
    entityObject.countryCode = countryCode;
  }

  if (isoCode) {
    entityObject.isoCode = isoCode;
  }

  if (email) {
    entityObject.email = email;
  }

  if (gender) {
    entityObject.gender = gender;
  }

  try{
    const user = new userModel({
    username,
    firstName,
    otherNames,
    provider,
    msisdn,
    password,
    countryCode,
    isoCode,
    email,
    gender
  });

  const newUser = await user.save();

  return res.status(201).json({
    success: true,
    user: newUser,
    // tokens: await createUserTokens({
    //   username: username,
    // }),
  });
  }catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  
};

const getUsers =  async (req, res) => {
  const users = await userModel.find();
  res.json(users);
};

module.exports = {
  findUser,
  registerUser,
  loginUser,
  changePassword,
  listAllUsers,
  getUsers,
};
