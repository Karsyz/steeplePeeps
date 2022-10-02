const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

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
  church: { 
    type: Array, 
    required: true, 
  },
  isAdmin: { 
    type: Boolean, 
    required: true, 
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  phone: String,
  txtOk: Boolean,

  address1: String,
  city: String,
  province: String,
  postCode: String,
  country: String,

  cloudinaryId: String,
});

// Password hash middleware.
UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});


// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword( candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
