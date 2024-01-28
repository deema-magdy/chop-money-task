const express = require("express");
const app = express();
const router = express.Router();
const {
  findUser,
  registerUser,
  loginUser,
  changePassword,
  listAllUsers,
  getUsers
} = require("./userController");
const userModel = require("../models/userModel");
//const { authenticateToken } = require("../../../../routes/auth/authController");

// POST: Create a new user
router.post("/registerUser", registerUser);

// GET: Get a user by username
router.get("/findUser",
//  authenticateToken(), 
findUser);

// GET: Get all users
router.get("/listAllUsers", 
// authenticateToken(),
 listAllUsers);

// POST: Login a user
router.post("/login", loginUser);

// POST: Forget password
router.post("/changePassword", changePassword);


// GET: Get all users
router.get("/getUsers", getUsers);


module.exports = router;
