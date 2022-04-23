const express = require("express");
const router = express.Router();

const Message = require("../models/message.controller");

// try{

// }catch(err){

// }
//create item
router.post("/", async (req, res) => {
  try {
    const item = await Message.create(req.body);
    return res.status(200).send(item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//Get All

router.get("/", async (req, res) => {
  try {
    const items = await Message.find().lean().exec();
    return res.status(201).send(items);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//get one
router.get("/:id", async (req, res) => {
  try {
    const item = await Message.findById(req.params.id).lean().exec();
    return res.status(201).send(item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//patch

router.patch("/:id", async (req, res) => {
  try {
    // 3 para [1. req.params, req.body, {n ew: true}]
    const item = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
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
    const item = await Message.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).send(item);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
