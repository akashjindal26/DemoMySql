module.exports = app => {
    const user = require("../controllers/user_controller.js");

    // Create a new Customer
    app.post("/user", user.create);

    // Retrieve all Customers
    app.get("/user", user.findAll);

    app.get('/user/:name',user.getUserByName);
};