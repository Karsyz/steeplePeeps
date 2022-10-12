const User = require("../models/User")

module.exports = {
    getDirectory: async (req, res) => {
      try {
        // Find all users that belong to the same churches user belongs to
        const directory = await User.find( {church: req.user.church} ).lean()
        // Find Church
        const church = await User.findById(req.user.church).lean()
        res.render("directory.ejs", { user: req.user, church, directory });
      } catch (err) {
        console.log(err)
      }
    }
}
  