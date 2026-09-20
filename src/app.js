const express = require("express");

const app = express();
const auth = require("./middleware/auth");
const dbConnect = require("./config/database");
const bcrypt = require("bcrypt");

const User = require("./models/user");
const {
  userSignUpValidator,
  userLoginValidator,
} = require("./utlis/userValidator");
// Midldlware helps to parse incoming request body to json object to access the json data in it
app.use(express.json());

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
      res.send("Login Successful");
    } else {
      res.send("Invalid Password");
    }
  } catch (err) {
    res.status(400).send("Something went wrong please try again!" + err);
  }
});
// Get use by email or id
app.get("/user", async (req, res) => {
  const email = req.body.email;

  //Find user by id more opimized than findOne({ email: email }) as it

  // const id  = req.body.id;

  // const user = await User.findById(id);

  const user = await User.findOne({ email: email });

  res.send(user);
});

app.get("/feed", async (req, res) => {
  try {
    //Get all users from the database using the User model's find method. This will return an array of user documents.
    // Here we can also pass field names to filter the documents.
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.send(users);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching users", error: err.message });
  }
});

app.patch("/user/:userId", async (req, res) => {
  try {
    const id = req.params?.userId;
    const updatedUser = req.body;

    const allowedFields = ["skills", "about", "photoUrl"];
    const isUserUpdateAllowed = Object.keys(updatedUser).every((key) => {
      return allowedFields.includes(key);
    });

    if (!isUserUpdateAllowed) {
      throw new Error("update not allowed");
    }

    if (updatedUser?.skills.length <= 5) {
      throw new Error("Skills should not be more than 5");
    }

    // Find the user by id and update it
    const user = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
      runValidators: true,
    });

    // Find the user by doucment field / id and udpate
    // const user = await User.findOneAndUpdate({_id:id},updatedUser, {new:true})

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating user", error: err.message });
  }
});

app.delete("/user", async (req, res) => {
  try {
    // Find the user by first email match and delete it from the database using the User model's findOneAndDelete method. This will return the deleted user document.
    const id = req.body.id;

    const user = await User.findByIdAndDelete(id);

    // const email = req.body.email;
    // const user = await User.findOneAndDelete({email});

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: err.message });
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
