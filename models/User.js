const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
// const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: false,
    required: false,
  },
  email: { 
    type: String, 
    unique: true,
    required: true, 
  },
  password: {
    type: String,
    required: false,
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
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  txtOk: {
    type: Boolean,
    required: false,
  },
  address1: {
    type: String,
    required: false,
  },
  address2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  postCode: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  cloudinaryId: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  iCanHelpWith: {
    type: Array,
    required: false,
  },
  members: {
    type: Array,
    required: false,
  },
  numOfSessions: {
    type: Number,
    required: false,
  },
  numOfEmailsSent: {
    type: Number,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  twitterId: {
    type: String,
    required: false,
  },
  magicLinkHash: {
    type: String,
    required: false,
  },
  // example: { 
  //   type: mongoose.ObjectId, 
  //   ref: Example  // another collection schema 
  // }

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
