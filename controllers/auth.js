const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const generator = require('generate-password')
const sendEmail = require('./email')

// Go To Login Page
exports.getLogin = (req, res) => {
  if (req.user) {
    if (req.user.isAdmin) {
      res.redirect("/dashboard");
    }else {
      res.redirect("/profile/user");
    }
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
exports.buildAChurch = (req, res) => {
  if (req.user) {
    return res.redirect("/churchProfile");
  }
  res.render("buildAChurch", {
    title: "Create Account",
  });
};

// Create User / Build A Church Signup Form Submission
exports.createUser = (req, res, next) => {

  const validationErrors = [];
  const isAdmin = req.body.isAdmin == "true" ? true : false
  const genPass = generator.generate({length: 12, numbers: true, symbols: true})
  const password = isAdmin ? req.body.password : genPass

  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });

  if (isAdmin && !validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
    
  if (isAdmin && req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../buildAChurch");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
    isAdmin: isAdmin,
    church: [req.user.id,],
    // Placeholder Values
    phoneNumber: "555 515 2212",
    txtOk: true,
    address1: "Address 1",
    address2: "Address 2",
    city: "City",
    province: "Province",
    country: "Country",
    postCode: "Post Code",
    image: "https://res.cloudinary.com/dcvxuwjri/image/upload/v1665276814/steeplePeeps/placeholder_x5v4uu.png",
    cloudinaryId: "",
    bio: "Example: Retired Teacher, love to golf, and I'm here to help where and when I can.",
    iCanHelpWith: "Example:I can help with yard work, bible study, cooking",
    members: []
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { name: req.body.name }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or name already exists.",
        });
        return isAdmin ? res.redirect("../buildAChurch") : res.redirect("../dashboard")
      }

      user.save((err) => {
        if (err) {
          return next(err);
        }
        if (isAdmin) {
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/dashboard");
          });
        }else {
            res.redirect("/dashboard");
        }
      });
    }
  );




};
