const User = require("../models/User")

module.exports = {
    getDashboard: async (req, res) => {
      // incomplete
      // add all user objects from in members array
      console.log(req.user.members)
      const allUsers = []
      for(let i = 0; i < req.user.members.length; i++) {
        allUsers.push( await User.findById(req.user.members[i]).lean() )
      }
    res.render("dashboard.ejs", {user: req.user, allUsers: allUsers });
    console.log(allUsers)
    },
  }
  
  
  // await User.findById(el).lean()