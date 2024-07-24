const { ValidationResult, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

const dotenv = require("dotenv");

dotenv.config();

const { JWT_TOKEN } = process.env;

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existing_user = await Admin.findOne({
      where: { email: req.body.email },
    });
    if (existing_user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      console.log(hash);

      await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      return res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  try {
    const user = await Admin.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res
        .status(401)
        .send({ msg: "Entered password or email is incorrect!" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      const token = jwt.sign({ id: user.id }, JWT_TOKEN, { expiresIn: "1h" });
      return res.status(200).send({ msg: "Logged in successfully", token });
    } else {
      return res
        .status(401)
        .send({ msg: "Entered password or email is incorrect!" });
    }
  } catch (err) {
    return res.status(401).send({ msg: err });
  }
};

const logout = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(authToken, JWT_TOKEN);

  // No need for a database query to log out
  res.clearCookie("token");
  return res.status(200).send({ msg: "Logged out successfully" });
};
module.exports = {
  register,
  login,
  logout,
};
