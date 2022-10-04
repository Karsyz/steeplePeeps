const passport = require("passport");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passportLocalMongoose = require('passport-local-mongoose');


// Go To Password Update Page
exports.updatePage = async (req, res) => {
    res.render("updatePassword", {user: req.user.password });
    // console.log(req.user.password)
  },



// Update User Password
exports.updatePassword = (req, res, next) => {
  // const validationErrors = [];

  // // Validate new password length
  // if (!validator.isLength(req.body.newPassword, { min: 8 }))
  //   validationErrors.push({
  //     msg: "Password must be at least 8 characters long",
  //   });
    
  // // Confirm new password fields match
  // if (req.body.newPassword !== req.body.confirmNewPassword)
  //   validationErrors.push({ msg: "Passwords do not match" });
  
  // // Display errors if any and redirect
  // if (validationErrors.length) {
  //   req.flash("errors", validationErrors);
  //   return res.redirect("/update");
  // };

//   // Update The password in the database
//   // console.log('change password')
//   // try {

//   // } catch (err) {
//   //   console.log(err)
//   // }

User.findById(req.user._id)
        .then(foundUser => {
          console.log(req.user._id)
            console.log(req.body.existingPassword)
            console.log(req.body.newPassword)
            foundUser.changePassword(req.body.existingPassword, req.body.newPassword)
                .then(() => {
                    console.log('password changed');
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        });
  // User.changePassword(req.body.existingPassword, req.body.newPassword, (err) => {console.log(err)})
  

} 

// exports.updatePassword  = async (req, res) => {
//   const user = await User.findOne({ username: req.user.username }); 
//   console.log(user)
 
//   await user.setPassword(req.body.newPassword); 
  
//   const updatedUser = await user.save(); 
//   // console.log(updatedUser)
//   req.login(updatedUser, (err) => {
//     if (err) {
//       console.log(err)
//     }
//     if (req.user.isAdmin) {
//       res.redirect("/dashboard");
//     }else {
//       res.redirect("/directory");
//     }
    
//   }); 
//   console.log(user)
//   req.flash('success', 'Password Changed Successfully') 
//   return res.redirect('/userProfile') 

// }