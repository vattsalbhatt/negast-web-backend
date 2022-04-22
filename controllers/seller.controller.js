const express = require("express");
const router = express.Router();
const Seller = require("../models/seller.model");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const newToken = (item) => {
  return jwt.sign({ item }, "VattsalBhatt");
};

//Create and before check email

router.post(
  "/register",
  body("email")
    .isEmail()
    .custom(async (value) => {
      const item = await Seller.findOne({ email: value });
      if (item) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ data: errors.array() });
    }

    try {
      const item = await Seller.create(req.body);

      const token = newToken(item);

      // console.log({ item, token });
      return res.send({ item, token });
    } catch (er) {
      return res.send(er);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const items = await Seller.find().lean().exec();

    return res.send(items);
  } catch (er) {
    return res.status(504).send("ERROR : " + er);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const items = await Seller.findByIdAndDelete(req.params.id);

    return res.send(items);
  } catch (er) {
    return res.status(504).send("ERROR : " + er);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const item = await Seller.findOne({ email: req.body.email });

    if (!item) {
      return res.status(400).send({ message: "Invalid username or password" });
    }
    const match = item.checkPassword(req.body.password);

    if (!match) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    const token = newToken(item);

    return res.status(200).send({ token, item });
  } catch (er) {
    return res.status(504).send("ERROR : " + er);
  }
});

module.exports = router;
