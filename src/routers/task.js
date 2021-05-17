const express = require('express')
const router = new express.Router()
const Task = require("../models/task.js");
require("../db/mongoose.js");


router.get("/tasks", async (req, res) => {
    try {
      const tasks = await Task.find({});
      res.send(tasks);
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
  
  router.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id;
  
    try {
      const task = await Task.findById(_id);
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
  
  router.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
  
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
  
  router.put("/tasks/:id", async (req, res) => {
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
      const task = await Task.findByIdAndUpdate(_id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!task) {
        res.status(404).send("Not Found");
      }
      res.send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.delete('/tasks/:id',async (req,res) => {
    const _id = req.params.id
    try {
      const task = await Task.findByIdAndRemove(_id);
      res.send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  })

  module.exports = router
