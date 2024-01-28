const express = require("express");
const app = express();
const router = express.Router();
const {
  findUser,
  registerUser,
  loginUser,
  changePassword,
  listAllUsers
} = require("./userController");
const userModel = require("../models/userModel");
const { authenticateToken } = require("../routes/authController");

// POST: Create a new user
router.post("/registerUser", registerUser);

// GET: Get a user by username
router.get("/findUser",
findUser);

// GET: Get all users
router.get("/listAllUsers", 
 authenticateToken(),
 listAllUsers);

// POST: Login a user
router.post("/login", loginUser);

// POST: Forget password
router.post("/changePassword", changePassword);



module.exports = router;
