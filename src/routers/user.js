const express = require("express");
const router = new express.Router();
const User = require("../models/user");
require("../db/mongoose.js");
const auth = require('../midleware/auth')

router.get("/test", (req, res) => {
  res.send("Form a new file");
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken()
    res.status(201).send({user, token});
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

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({user:user, token:token})
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token
    })
    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async(req, res) => {
  console.log(req.user);
  try {
    req.user.tokens = []
    await req.user.save()

    res.send('All token deleted and logedout')
  } catch (error) {
    res.status(500).send()
  }
})

router.put("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOp) {
    return res.status(400).send({ error: "Invalid parameter" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]))

    await req.user.save()

    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndRemove(req.user._id);
    // if (!user) {
    //   res.status(404).send("Not Found");
    // }

    await req.user.remove()
    res.send(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/users/me", auth ,async (req, res) => {
  res.send(req.user)
  // try {
  //   const users = await User.find({});
  //   res.status(201).send(users);
  // } catch (error) {
  //   res.status(500).send(error);
  // }

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

module.exports = router;
