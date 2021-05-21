const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Task = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive number!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate(value) {
      if (validator.contains("password", value.toLowerCase())) {
        throw new Error("Password can not contain password word");
      }
    },
  },
  tokens: [{
    token: {
      type:String,
      required:true
    }
  }],
  picture: {
    type:Buffer
  }
}, {
  timestamps:true
});

userSchema.virtual('tasks', {
  ref:'Task',
  localField:'_id',
  foreignField: 'user'
})

userSchema.methods.generateAuthToken = async function () {
  const user = this

  const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)

  user.tokens = user.tokens.concat({token})
  await user.save()
  
  return token
}

userSchema.methods.toJSON = function () {
  const user = this

  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.picture

  return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("There is no user with this email");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

// Hashing password before create and update
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// delete tasks if user removed
userSchema.pre('remove', async function (req,res, next) {
  const user = this

  await Task.deleteMany({ user:user._id})

  next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;
