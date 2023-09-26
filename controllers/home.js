module.exports = {

  getIndex: (req, res) => {
    //if a user is already logged in
    if (req.user) {
      // if admin redrirect to dashboard
      if (req.user.isAdmin) {
        res.redirect("/dashboard");
      // if not admin redirect to directory
      }else {
        res.redirect("/directory");
      }
    }else {
      res.render("index.ejs", { user: req.user, isLoggedIn: false });
      // console.log(req.user)
    }
    
  },

  errorPage: (req, res) => {
    res.render("errorPage.ejs");
  },


  demo: (req, res) => {
    res.render("demo.ejs");
  },


};
