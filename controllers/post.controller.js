const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");

// try{

// }catch(err){

// }
//create item
router.post("/", async (req, res) => {
  try {
    const item = await Post.create(req.body);
    return res.status(200).send(item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//Get All

router.get("/", async (req, res) => {
  try {
    const items = await Post.find()
      .populate({ path: "product" })
      .populate({ path: "buyer" })
      .lean()
      .exec();
    return res.status(201).send(items);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//get one
router.get("/:id", async (req, res) => {
  try {
    const item = await Post.findById(req.params.id)
      .populate({ path: "product" })
      .populate({ path: "buyer" })
      .lean()
      .exec();
    return res.status(201).send(item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//get user specific post
router.get("/buyer/:buyerid", async (req, res) => {
  try {
    const item = await Post.find({ buyer: req.params.buyerid })
      .populate({ path: "product" })
      .populate({ path: "buyer" })
      .lean()
      .exec();
    return res.status(201).send(item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//patch

router.patch("/:id", async (req, res) => {
  try {
    // 3 para [1. req.params, req.body, {n ew: true}]
    const item = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate({ path: "product" })
      .populate({ path: "buyer" })
      .lean()
      .exec();

    return res.status(201).send(item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//delete

router.delete("/:id", async (req, res) => {
  try {
    const item = await Post.findByIdAndDelete(req.params.id)
      .populate({ path: "product" })
      .populate({ path: "buyer" })
      .lean()
      .exec();
    return res.status(201).send(item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
