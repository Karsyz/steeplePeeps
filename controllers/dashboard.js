module.exports = {
    getDashboard: (req, res) => {
      res.render("dashboard.ejs", {user: req.user });
    },
  };
  