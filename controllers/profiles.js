const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");


module.exports = {
  getUserProfileId: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      // pass in both the currently logged in user from req.user 
      // and the user from req.params.id so that the nav bar logic works and displays correctly.
      res.render("userProfile.ejs", { displayedUser: user, user: req.user });
    } catch (err) {
      console.log(err)
    }
  },

  getUserProfile: async (req, res) => {
    try {
      res.render("userProfile.ejs", { displayedUser: req.user, user: req.user });
    } catch (err) {
      console.log(err)
    }
  },

  sendUserProfile: async (req, res) => {
    try {
      let user = await User.findById({ _id: req.params.id });
      res.send(user);
    } catch (err) {
      console.log(err)
    }
  },

  deleteProfile: async (req, res) => {
    try {
      // Find user by id
      let user = await User.findById({ _id: req.params.id });
  
      // Delete user image from cloudinary
      // await cloudinary.uploader.destroy(user.cloudinaryId);
      
      // Delete post from db
      await User.remove({ _id: req.params.id });
      
      console.log("Deleted Profile");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err)
      res.redirect("/dashboard");
    }
  }
};
