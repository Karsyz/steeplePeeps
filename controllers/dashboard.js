const User = require("../models/User");
const { getRandomName } = require("./auth");

module.exports = {
  getDashboard: async (req, res) => {
    const randEmail = `${await getRandomName()}${Math.floor(
      Math.random() * 12345
    )}@${await getRandomName()}.net`;

    const randName = (await getRandomName()) + " " + (await getRandomName());
    console.log(req)
    if (req.user.isAdmin) {
      allUsers = await User.find({ church: req.user.id }).lean();
      res.render("dashboard.ejs", {
        user: req.user,
        allUsers: allUsers,
        demo: { email: randEmail, name: randName },
      });
    } else {
      res.redirect("/directory");
    }
  },
};
