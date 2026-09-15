const express = require("express");

const app = express();



//Hanlding multiple middleware functions ( route handlers ) for a single route

// app.use('/router',rh1,[rh2,rh3],rh4,rh5) // Grouping route handlers for a single route
app.use(
  "/test",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    res.send("response 4");
  },
);

app.get("/user/:userId", (req, res, next) => {
  res.send(
    `User id is ${req.params.userId}, username is ${req.query.username}, password is ${req.query.password}`,
  );
});

app.post("/user", (req, res) => {
  res.send("Usrer created successfully");
});

app.delete("/user", (req, res) => {
  res.send("User deleted successfully")``;
});

app.patch("/user", (req, res) => {
  res.send("User updated successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
