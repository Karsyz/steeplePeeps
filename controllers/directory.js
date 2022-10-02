module.exports = {
    getDirectory: (req, res) => {
      res.render("directory.ejs", {user: req.user });
    },
  };
  