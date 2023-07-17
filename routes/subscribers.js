const express = require("express");
const subscriber1 = require("../models/subscriber");

const router = express.Router();

//getting all  row of data
router.get("/", async (req, resp) => {
  try {
    const subscribers = await subscriber1.find();
    resp.json(subscribers);
  } catch (error) {
    //sending status code with message to the frontend
    resp.status(500).json({ message: error.message });
  }
});

//getting single row of data
router.get("/:id", getById, async (req, resp) => {
  resp.send(resp.subscribers.name);
});

//new  row of data
router.post("/", async (req, resp) => {
  const subscriber = new subscriber1({
    name: req.body.name,
  });

  try {
    const newSubscribers = await subscriber.save();
    //more specific way of saying you created an object
    resp.status(201).json(newSubscribers);
  } catch (error) {
    resp.status(400).json({ message: error.message });
  }
});

//update only what user passes while put updates all information
router.patch("/", getById, async (req, resp) => {
  if (req.body.name !== null) {
    req.subscriber.name = req.body.name;
  }

  try {
    let updatedValue = await resp.subscriber.save();
    //more specific way of saying you created an object
    resp.status(201).json({ message: updatedValue });
  } catch (error) {
    resp.status(400).json({ message: error.message });
  }
});

//delete only single row of data
router.delete("/", getById, async (req, resp) => {
  try {
    await resp.subscriber.remove();
    //more specific way of saying you created an object
    resp.status(201).json({ message: "deleted subscriber" });
  } catch (error) {
    resp.status(400).json({ message: error.message });
  }
});

async function getById(req, resp, next) {
  let subscribers;
  try {
    subscribers = await subscriber1.findById(req.params.id);
    if (subscribers === null) {
      return resp.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (error) {
    //sending status code with message to the frontend
    return resp.status(500).json({ message: error.message });
  }

  resp.subscriber = subscribers;
  next();
}

module.exports = router;
