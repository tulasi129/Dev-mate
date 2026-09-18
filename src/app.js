const express = require("express");

const app = express();
const auth = require("./middleware/auth");
const dbConnect = require("./config/database");

const User = require("./models/user");

// Midldlware helps to parse incoming request body to json object to access the json data in it
app.use(express.json());

app.use("/test", (req, res) => {
  res.send("test route is working");
});

app.post("/signup", async (req, res) => {
  console.log("Request body:", req.body); // Log the request body to see what data is being sent
  const userObject = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
  };

  //Create a new user instance using the User model and passing userobject as an argument to the constructor. This will create a new user document in the database with the provided data.
  const user = new User(userObject);

  try {
    await user.save()
      .then(() => {
        res.status(200).json({ message: "User created successfully" });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Error creating user", error: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

dbConnect()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error while connecting to database", err.message);
  });
