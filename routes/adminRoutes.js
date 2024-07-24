const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  signUpValidation,
  loginValidation,
  updateValidation,
} = require("../helpers/validation");
const adminController = require("../controllers/adminController");

router.post("/register", signUpValidation, adminController.register);
router.post("/login", adminController.login);
router.post("/logout", auth.isAuthorize, adminController.logout);
module.exports = router;
