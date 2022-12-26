const User = require("../models/User")

module.exports = {
  
    getDashboard: async (req, res) => {
      if (req.user.isAdmin) {
        allUsers = await User.find( {church: req.user.id} ).lean()
        res.render("dashboard.ejs", { user: req.user, allUsers: allUsers });
      }else {
        res.redirect("/directory");
      }
      
    },
  }
  