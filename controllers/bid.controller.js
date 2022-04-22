const express = require("express");
const router = express.Router();
const Bid = require("../models/bid.model");

// try{

// }catch(err){

// }
//create item
router.post("/", async (req, res) => {
  try {
    const item = await Bid.create(req.body);
    return res.status(200).send(item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//Get All

router.get("/", async (req, res) => {
  try {
    const items = await Bid.find()
      .populate({ path: "post" })
      .populate({ path: "seller" })
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
    const item = await Bid.findById(req.params.id)
      .populate({ path: "post" })
      .populate({ path: "seller" })
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
    const item = await Bid.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate({ path: "post" })
      .populate({ path: "seller" })
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
    const item = await Bid.findByIdAndDelete(req.params.id)
      .populate({ path: "post" })
      .populate({ path: "seller" })
      .lean()
      .exec();
    return res.status(201).send(item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
