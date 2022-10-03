const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

// Go To Login Page
exports.getLogin = (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  }
    res.render("login", {
    title: "Login",
  });
};

// Login to Server
exports.postLogin = (req, res, next) => {

  const validationErrors = [];
  
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });

  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log(req.user.password)
      
      // redirect to admin dashboard or user directory
      req.flash("success", { msg: "Success! You are logged in." });
      if (req.user.isAdmin) {
        res.redirect(req.session.returnTo || "/dashboard");
      }else {
        res.redirect(req.session.returnTo || "/directory");
      }
    });
  })(req, res, next);

};


// Logout of Server
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

// Build A Church Signup Page
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/churchProfile");
  }
  res.render("buildAChurch", {
    title: "Create Account",
  });
};

// Build A Church Signup Form Submission
exports.postSignup = (req, res, next) => {

  const validationErrors = [];

  if (!validator.isEmail(req.body.churchEmail))
    validationErrors.push({ msg: "Please enter a valid email address." });

  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
    
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

    if (req.body.churchEmail !== req.body.confirmChurchEmail)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../buildAChurch");
  }
  req.body.email = validator.normalizeEmail(req.body.churchEmail, {
    gmail_remove_dots: false,
  });

  const user = new User({
    name: req.body.churchName,
    email: req.body.churchEmail,
    password: req.body.password,
    isAdmin: true,
    church: [req.body.churchName,]
  });

  User.findOne(
    { $or: [{ email: req.body.churchEmail }, { name: req.body.churchName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or name already exists.",
        });
        return res.redirect("../buildAChurch");
      }

      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

        if (req.user.isAdmin) {
          res.redirect("/dashboard");
        }else {
          res.redirect("/directory");
        }

        });
      });
    }
  );

};
