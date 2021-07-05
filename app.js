const express = require("express");
require("dotenv").config()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("../DemoMySql/routes/user_route.js")(app);

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT NUMBER ${process.env.PORT}`)
})
