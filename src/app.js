const express = require("express");

const app = express();
const auth = require("./middleware/auth");
const dbConnect = require("./config/database");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const {
  userSignUpValidator,
  userLoginValidator,
} = require("./utlis/userValidator");

// Midldlware helps to parse incoming request body to json object to access the json data in it
app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req, res) => {
  userSignUpValidator(req.body);

  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    about,
    photoUrl,
    skills,
  } = req.body;

  const hashePassword = await bcrypt.hash(password, 10);
  console.log(hashePassword);

  // eeor chekcing
  if (skills <= 5) {
    throw new error("Skills should not be more than 5");
  }

  //Create a new user instance using the User model and passing userobject as an argument to the constructor. This will create a new user document in the database with the provided data.
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashePassword,
    age,
    gender,
    skills,
  });

  try {
    await user
      .save()
      .then(() => {
        res.status(200).json({ message: "User created successfully" });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Error creating user", error: err.message });
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    userLoginValidator(req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const passwordCompare = await bcrypt.compare(password, user?.password);

    if (passwordCompare) {
      const tokenGeneration = await jwt.sign({ _id: user.id }, "dev-mate", {
        expiresIn: 60 * 60,
      });
      res.cookie("token", tokenGeneration);

      res.send("Login Successful");
    } else {
      res.send("Invalid Password");
    }
  } catch (err) {
    res.status(400).send("Something went wrong please try again!" + err);
  }
});

app.get("/profile", auth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong " + " : " + err);
  }
});

app.get("/sendProfile-connection", auth, async (req, res) => {
  try {
    const user = req.user;

    res.send("Connection send successfully from " + user.firstName);
  } catch (err) {
    
    res.status(400).send("Something went wrong " + " : " + err);
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
