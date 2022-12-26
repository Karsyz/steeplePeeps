const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const generator = require('generate-password')
const nodemailer = require("nodemailer");

// Go To Login Page
exports.getLogin = (req, res) => {
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
    res.render("login", {
    title: "Login",
  });
}
};

// Login to Server
exports.postLogin = async (req, res, next) => {

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
exports.buildAChurchForm = (req, res) => {
  if (req.user) {
    return res.redirect("/churchProfile");
  }
  res.render("buildAChurch", {
    title: "Create Account",
  });
};

//  Build A Church Signup Form Submission
exports.buildAChurch = (req, res, next) => {

  const validationErrors = [];
  const randomAvatar = generator.generate({length: 16})

  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });

  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
    
  if (req.body.password !== req.body.confirmPassword)
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
    password: req.body.password,
    isAdmin: true,
    church: [],
    // Placeholder Values
    phoneNumber: "555 515 2212",
    txtOk: true,
    address1: "Address 1",
    address2: "Address 2",
    city: "City",
    province: "Province",
    country: "Country",
    postCode: "Post Code",
    image: `https://robohash.org/${randomAvatar}?set=set4`,
    cloudinaryId: "",
    bio: "Example: Retired Teacher, love to golf, and I'm here to help where and when I can.",
    iCanHelpWith: "Example: I can help with yard work, bible study, cooking",
    members: [],
    numOfSessions: 0,
    numOfEmailsSent: 0,
  });

  // Add new user id to user.church array
  user.church.push(user.id)

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
        return res.redirect("../buildAChurch")
      }
    }
  );

  user.save((err) => {
    if (err) {
      return next(err);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/dashboard");
    });
  });

};


// Create a user from dashboard
exports.createUser = async (req, res, next) => {

  const validationErrors = [];
  const genPass = generator.generate({length: 12, numbers: true, symbols: true})
  const randomAvatar = generator.generate({length: 16})

  console.log(genPass)

  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });

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
    password: genPass,
    isAdmin: false,
    church: [req.user.id],
    // Placeholder Values
    phoneNumber: "555 515 2212",
    txtOk: true,
    address1: "Address 1",
    address2: "Address 2",
    city: "City",
    province: "Province",
    country: "Country",
    postCode: "Post Code",
    image: `https://robohash.org/${randomAvatar}`,
    cloudinaryId: "",
    bio: "Example: Retired Teacher, love to golf, and I'm here to help where and when I can.",
    iCanHelpWith: "Example: I can help with yard work, bible study, cooking",
    members: [],
    numOfSessions: 0,
    numOfEmailsSent: 0,
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
        return res.redirect("../dashboard")
      }
    }
  );

  user.save((err) => {
    if (err) {
      return next(err);
    }
  });


  // Send login email to user
  try {
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.SERVER_EMAIL, 
        pass: process.env.SERVER_EMAIL_PSWD, 
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Karsy" <steeplepeeps100@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: `Welcome To the ${req.user.name} Member Directory`, // Subject line
      text: `Welcome To the ${req.user.name} Member Directory`, // plain text body
      html: `<h1>
              Welcome to the ${req.user.name} Member Directory
            </h1>
            <p>Login to your account at <a href="http://localhost:3000/">Steeple Peeps</a>
            </p>
            <p>Your password is ${genPass}</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.redirect("/dashboard");

    } catch (err) {
      console.log(err)
      res.redirect("/dashboard");
    }

};

