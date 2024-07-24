const { check } = require("express-validator");

exports.signUpValidation = [
  check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").isLength({ min: 6, max: 8 }),
];

exports.loginValidation = [
  check("password", "Entere a password of min 6 length ").isLength({
    min: 6,
    max: 118,
  }),
];

exports.updateValidation = [
  check("phone", "Please Enter a valid Phone Number").isMobilePhone(),
  check("password", "Password is required").isLength({ min: 6, max: 8 }),
];
