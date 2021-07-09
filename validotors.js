
const { check, validationResult } = require('express-validator');

exports.userSignupValidator = [
    check("USER_EMAIL").normalizeEmail().isEmail().withMessage("Invalid Email Id"),
    check("PASSWORD", "PASSWORD IS REQUIRED").notEmpty(),
    check("PASSWORD", "PASSWORD MINIMUM LENGTH 6").isLength({ min: 6 }),
    check("USER_MOBILE_NO","INVALID MOBILE NUMBER FORMATE").isMobilePhone('en-IN')
];

exports.userSignupValidatorResult = (req, res, next) => {

    var result = validationResult(req).array();
    if (!result.length) return next()

    const error = result;
    res.send({ msg: error })


}


exports.userSigninValidator = [
    check("USER_EMAIL").normalizeEmail().isEmail().withMessage("Invalid Email Id"),
    check("PASSWORD", "PASSWORD IS REQUIRED").notEmpty(),
    check("PASSWORD", "PASSWORD MINIMUM LENGTH 6").isLength({ min: 6 })
];

exports.userSigninValidatorResult = (req, res, next) => {

    var result = validationResult(req).array();
    if (!result.length) return next()

    const error = result;
    res.send({ msg: error })


}



