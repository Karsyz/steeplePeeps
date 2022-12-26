const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
// const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: true,
    required: true,
  },
  email: { 
    type: String, 
    unique: true,
    required: true, 
  },
  password: {
    type: String,
    required: true,
  },
  church: { 
    type: Array, 
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  txtOk: {
    type: Boolean,
    require: true,
  },
  address1: {
    type: String,
    require: true,
  },
  address2: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  province: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  postCode: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  iCanHelpWith: {
    type: String,
    require: true,
  },
  members: {
    type: Array,
    require: true,
  },
  numOfSessions: {
    type: Number,
    require: true,
  },
  numOfEmailsSent: {
    type: Number,
    require: true,
  },
});

// Password hash middleware.
UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err)
    user.password = hash;
    next();
  });
});


// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword( candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};


// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
