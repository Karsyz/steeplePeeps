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
  phoneNumber: String,
  txtOk: Boolean,
  address1: String,
  address2: String,
  city: String,
  province: String,
  country: String,
  postCode: String,
  cloudinaryId: String,
  bio: String,
  iCanHelpWith: String,
  members: Array, 
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
