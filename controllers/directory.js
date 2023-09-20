const User = require("../models/User")

module.exports = {

    getDirectory: async (req, res) => {
      try {
        // Find all users that belong to the same churches user belongs to
        const members = await User.find({church: req.user.church[0]})
        const churches = await User.find({isAdmin: true})

        // if user has no churches, list only churches
        // console.log(members)
        const directory = members.length > 0 ? members : churches

        const usersChurch = await User.findById(req.user.church[0])
        
        let church;
        
        // if user has no church, change the page title and description
        if(usersChurch) {
          church = usersChurch
          church.description = 'Member Directory'

        } else {
          church = {
            name: "You Don't has a Church Yet", 
            description: 'Contact your church for access.'
          }
        }

        res.render("directory.ejs", { user: req.user, church, directory });
      } catch (err) {
        console.log(err)
      }
    },

}
  
// const churches = ['63435f5ca3db0d39442e878f', '63680b6390ea860620762fea', '64f15b2076c9cc001e4908b1'] //req.user.church
// const directory = await Promise.all( req.user.church.map(async el => {
//   const members = await User.find( {church: el} ).lean()
//   return members
// }))
