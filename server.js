const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./user/userRoutes");
require("dotenv").config();

// Middleware
app.use(express.json());

// Mongoose Setup
mongoose.set("strictQuery", false);

const port = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

app.use("/api", router);