const User = require("../models/User")

module.exports = {
    getDirectory: async (req, res) => {
      try {
        // Find all users that belong to the same churches user belongs to
        const directory = await User.find({church: req.user.church[0]})

        const church = await User.findById(req.user.church[0]) || {name: "You Don't has a Church Yet"}

        res.render("directory.ejs", { user: req.user, church, directory });
      } catch (err) {
        console.log(err)
      }
    }
}
  
// const churches = ['63435f5ca3db0d39442e878f', '63680b6390ea860620762fea', '64f15b2076c9cc001e4908b1'] //req.user.church
// const directory = await Promise.all( req.user.church.map(async el => {
//   const members = await User.find( {church: el} ).lean()
//   return members
// }))
