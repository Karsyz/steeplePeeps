const passport = require("passport");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require('mongoose');
const { restart } = require("nodemon");

// Go To Password Update Page
exports.updatePage = async (req, res) => {
  console.log(req.user)
  res.render("updatePassword", {user: req.user.password });
  // console.log(req.user)
},


// Update User Password
exports.updatePassword = async (req, res, next) => {
   const validationErrors = [];

  // Validate new password length
  if (!validator.isLength(req.body.newPassword, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
    
  // Confirm new password fields match
  if (req.body.newPassword !== req.body.confirmNewPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  
  // Display errors if any and redirect
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/update");
  };

  // declare user
  const user = req.user

  // error if no user
  if (!user) {
    return res.status(400).sent('Cannot find user')
  }
  
  // Does existing password match? 
  try {
    if (await bcrypt.compare(req.body.existingPassword, user.password)) {
      console.log("Existing password matches database")

      // Update password in the model
      user.password = req.body.newPassword

      // Saves new password to model (mongoose will then hash the password and update db)
      await user.save( (err) => {
        if (err) console.log(err)
      })
        
    } else {
      console.log('Existing Password does not match')
      res.redirect('/update')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }        
  // Check if password was updated in database
  // setTimeout is here because save callback doesn't produce anything. 
  // Update this in the future so it works properly.
  // investigate opening up a new db connection?
    setTimeout(async () => {
      const dbCheck = await User.findOne({ _id: user._id })
      console.log(dbCheck)
      if (await bcrypt.compare(req.body.newPassword, dbCheck.password)) {
        console.log('Password has been updated')
        res.redirect('/userProfile')
      } else {
        console.log(`Password didn't update in the db`)
        res.redirect('/update')
      }

    }, 3000)
}
