const passport = require("passport");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const mongoose = require('mongoose');
const { restart } = require("nodemon");

// Go To Password Update Page
exports.updatePage = async (req, res) => {
  console.log(req.user.isAdmin)
  if(req.user.isAdmin) {
    const user = await User.findById(req.params.id);
    // pass in both the currently logged in user and the user from req.params.id
    res.render("updatePassword", { displayedUser: user, user: req.user } );
  }else {
    res.render("updatePassword", {user: req.user.password });
  }
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
  let user;
  if(req.user.isAdmin) {
    user = await User.findOne({_id: req.params.id})
  }else {
    user = req.user
  }

  // error if no user
  if (!user) {
    return res.status(400).sent('Cannot find user')
  }

  try {
      bcrypt.hash(req.body.newPassword, 10, async function(err, hash) {
        if (err) return next(err)
        await User.findOneAndUpdate({_id: user.id}, {password: hash})
      });
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }     

  // check if password is updated in db
  setTimeout(async () =>{
    const updated = await User.findOne({_id: user.id})
    const result = await bcrypt.compare(req.body.newPassword, updated.password)
      if(result) {
        console.log('Password successfully updated')
        res.redirect('/dashboard')
      }else {
        console.log('Password not updated')
        res.redirect('/dashboard')
      }
       
  }, 1000)
}

// Update User Information
exports.putUpdateUserProfile = async (req, res, next) => {
  
  //covert txtOk string to boolean
  let txtOk = false
  if(req.body.txtOk === 'on') {
    txtOk = true
  }
  
  try {
      await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { 
          name:         req.body.name,
          email:        req.body.email,
          phoneNumber:  req.body.phoneNumber,
          txtOk:        txtOk,
          address1:     req.body.address1,
          address2:     req.body.address2,
          city:         req.body.city,
          province:     req.body.province,
          country:      req.body.country,
          postCode:     req.body.postCode,
          bio:          req.body.bioForm,
          iCanHelpWith: req.body.iCanHelpWith,
         },
        }
    );
    console.log("Updated User Info");
    res.redirect(`/profile/user/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
}

// Update User Profile Picture
exports.updateProfilePicture = async (req, res, next) => {
  try {
    // Get existing cloudinary Id from db
    const existingCloudinaryId = req.user.cloudinaryId

    // Delete existing image from cloudinary if not default image
    if (existingCloudinaryId !== "") {
      await cloudinary.uploader.destroy(existingCloudinaryId);
    }

    // Upload new image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {width: 500, height: 500, crop: "fill", folder: "steeplePeeps"})
    
    // Update Db
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        image: result.secure_url, 
        cloudinaryId: result.public_id,
      }
    );

    console.log("Picture Added");
    if (req.user.isAdmin) {
      res.redirect(`/profile/user/${req.params.id}`);
    }else {
      res.redirect("/profile/user/");
    }
  } catch (err) {
    console.log(err);
  }
}