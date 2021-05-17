const express = require('express')
const router = new express.Router()
const User = require("../models/user");
require("../db/mongoose.js");


router.get('/test', (req, res) => {
    res.send('Form a new file')
})

router.post("/users", async (req, res) => {
    const user = new User(req.body);
  
    try {
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  
    // user
    //   .save()
    //   .then((result) => {
    //     res.status(201).send(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     res.status(400).send(error);
    //   });
  });
  
  router.put("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOp = updates.every((update) => {
      return allowedUpdates.includes(update);
    });
    const _id = req.params.id;
  
    if (!isValidOp) {
      return res.status(400).send({ error: "Invalid parameter" });
    }
    try {
      const user = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!user) {
        res.status(404).send("Not Found");
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.delete('/users/:id',async (req,res) => {
    const _id = req.params.id
    try {
      const user = await User.findByIdAndRemove(_id);
      if(!user) {
        res.status(404).send('Not Found')
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  
  router.get("/users", async (req, res) => {
    try {
      const users = await User.find({});
      res.status(201).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  
    // User.find({})
    //   .then((users) => {
    //     res.status(200).send(users);
    //   })
    //   .catch((e) => {
    //     res.status(500).send(e);
    //   });
  });
  
  router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
  
    try {
      const user = await User.findById(_id);
      res.send(user);
    } catch (e) {
      res.status(404).send(e);
    }
    // User.findById(_id)
    //   .then((user) => {
    //     if (!user) {
    //       return res.status(404).send("Not Found");
    //     }
    //     res.send(user);
    //   })
    //   .catch((e) => {
    //     res.status(500).send(e);
    //   });
  });

module.exports = router