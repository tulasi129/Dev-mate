const express = require("express");

const app = express();
const auth = require("./middleware/auth");
// Hanlding error through try catch block
app.get("/test", (req, res, next) => {
try{
    throw new Error("Unauthorized");

}
catch(err){
    res.status(401).send("Something went wrong");
}
});

app.get("/admin", auth, (req, res, next) => {
  res.send("Welcome to admin page");
});

app.get("/user", (req, res, next) => {
  throw new Error("Unauthorized");
});

// wILD CARD ERROR HANLDING MIDDLEWARE WHEN WE HAVE MULTIPLE ROUTES AND WE WANT TO HANDLE ERROR WIHTOUT NO TRY , CATCH BLOCKS
app.use("/", (err, req, res, next) => {
  res.status(401).send("Unauthorized");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
