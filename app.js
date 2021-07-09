const express = require("express");
require("dotenv").config();
const expressValidator = require("express-validator");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = require("./routes/user_route.js");
app.use("/api",users)

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT NUMBER ${process.env.PORT}`)
})
