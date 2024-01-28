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
const { authenticateToken, deleteRefreshToken } = require("../routes/authController");

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

// POST: Deletes corresponding refresh token from database on logout
router.post("/logout", deleteRefreshToken);



module.exports = router;
