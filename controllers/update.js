const passport = require("passport");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");


module.exports = {

  // Go To Password Update Page
  updatePage: (req, res) => {
    res.render("updatePassword", {user: req.user.password });
    // console.log(req.user.password)
  },

  // Update User Password
  updatePassword: async (req, res, next) => {
    const validationErrors = [];

    if (!validator.isLength(req.body.newPassword, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });

    if (req.body.newPassword !== req.body.confirmNewPassword)
      validationErrors.push({ msg: "Passwords do not match" });

    // Check if existing password matches database
    if (req.body.newPassword !== req.body.confirmNewPassword)
      validationErrors.push({ msg: "Passwords do not match" });
    
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/updatePassword");
    };

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("errors", info);
        return res.redirect("/login");
      }
      req.flash("success", { msg: "Authenticated" });

      
    });
 
    // console.log(req.user.name)
    console.log(req.body.existingPassword)
    
    
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)
      bcrypt.hash(req.body.existingPassword, salt, (err, hash) => {
        if (err) return next(err)
        console.log(hash)
        bcrypt.compare(req.user.password, hash, function(err, result) {
          if (err) return next(err)
          console.log(result)
        });

      })
    })
    
    console.log(req.user._id)
  
    // const hashedPassword = salty(req.body.existingPassword)
    // console.log( hashedPassword )
    

  //   bcrypt.genSalt(saltRounds, function(err, salt) {
  //     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
  //         // Store hash in your password DB.
  //     });
  // });
    
    // console.log(req.body)
    
    // User.findOne({ name: req.user.username })
    //   .then((u) => {
    //     u.setPassword(req.body.newPassword,(err, u) => {
    //       if (err) return next(err);
    //       u.save();
    //       res.status(200).json({ message: 'password change successful' });
    //       return res.redirect("/userProfile");
    //     });
    //   })
    
  
    
    // try {
    //   await user.findOneAndUpdate(
    //     { _id: req.params.id },
    //   { $set: { password: req.body.newPassword }, }
    //   );
    //   console.log("Password Updated");
    //   res.redirect(`/userProfile/${req.params.id}`);
    // }
    // catch (err) {
    //   console.log(err);
    // }

  }
 
}

