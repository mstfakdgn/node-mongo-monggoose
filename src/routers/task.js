const express = require("express");
const router = new express.Router();
const Task = require("../models/task.js");
require("../db/mongoose.js");
const auth = require("../midleware/auth");

router.get("/tasks", auth ,async (req, res) => {
  const match = {}
  const sort = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1: 1
  }

  try { 
    // const tasks = await Task.find({user:req.user._id});
    await req.user.populate({
      path:'tasks',
      match,
      options: {
        limit:parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }

  // Task.find({})
  //   .then((tasks) => {
  //     res.status(200).send(tasks);
  //   })
  //   .catch(() => {
  //     res.status(500).send(e);
  //   });
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, user: req.user.id });
    res.send(task);
  } catch (error) {
    res.status(500).send(e);
  }

  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(404).send("Not Found");
  //     }
  //     res.status(200).send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e);
  //   });
});

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    user: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
  // task
  //   .save()
  //   .then((result) => {
  //     res.status(201).send(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(400).send(error);
  //   });
});

router.put("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  const _id = req.params.id;

  if (!isValidOp) {
    return res.status(400).send({ error: "Invalid parameter" });
  }

  try {
    const task = await Task.findOne({_id:req.params.id, user:req.user._id})
    // const task = await Task.findById(_id);

    if (!task) {
      res.status(404).send("Not Found");
    }

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    //const task = await Task.findByIdAndRemove(_id);
    const task = await Task.findOneAndDelete({_id, user:req.user.id})
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
