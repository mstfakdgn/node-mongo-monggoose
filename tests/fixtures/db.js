const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { request } = require("../../src/app");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "test@gmail.com",
  password: "123456789",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOneId = mongoose.Types.ObjectId();
const taskOne = {
    _id: taskOneId,
    description:"Test task",
    completed:false,
    user: userOneId
}

const setupDatabase = async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
    await new User(userOne).save();
    await new Task(taskOne).save();
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase,
    taskOne,
    taskOneId
}