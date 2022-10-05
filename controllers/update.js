const passport = require("passport");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require('mongoose');
const { restart } = require("nodemon");



// Go To Password Update Page
exports.updatePage = async (req, res) => {
    res.render("updatePassword", {user: req.user.password });
    // console.log(req.user.password)
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

  // Does existing password match?
  const user = req.user
  console.log(`Existing password; ${user.password}`)
  if (!user) {
    return res.status(400).sent('Cannot find user')
  }
  try {
    if (await bcrypt.compare(req.body.existingPassword, user.password)) {
      console.log("Existing password matches database")

      // Hash new password
      bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
        if (err) return next(err)
        user.password = hash;
        console.log(`New hashed password; ${user.password}`)
        })

        // Update password in the database
        // let newPassword = user.password
        // console.log(newPassword)
        try {
          await User.findOneAndUpdate(
            { _id: user._id },
            {
              $set: { password: user.password },
            }
          );
        } catch (err) {
          console.log(err);
        }

        await user.save((err) => {
          if (err) {
            console.log(err)
            return next(err);
          }
          });

        // Check if password was updated in database
        const userDbCheck = await User.findOne({ _id: user._id })
        console.log(userDbCheck)
        if(user.password === userDbCheck.password) {
          console.log('Password has been updated')
          res.redirect('/userProfile')
        }

    } else {
      console.log("Existing Password does not match")
      res.redirect('/update')
    }
    
  } catch (err) {
    console.log(err)
    // res.status(500).send()
  }
}

