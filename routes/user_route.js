const express = require('express');
const router = express.Router();
const user = require("../controllers/users/user.js");
const validator = require("../validotors.js");


router.post("/user", validator.userSignupValidator, validator.userSignupValidatorResult, user.signup);
router.get("/user", validator.userSigninValidator, validator.userSigninValidatorResult, user.signin);
router.post("/user/placeorder/:USER_ID", user.verifyUserLogin, user.placeOrder);
router.get("/user/getorderdetails/:USER_ID", user.verifyUserLogin, user.getOrderDetails);


module.exports = router;