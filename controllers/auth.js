const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const generator = require('generate-password')
const nodemailer = require("nodemailer");
const fs = require('fs/promises');

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
    validationErrors.push({ 
    type: 'noEmail',
    msg: "Please enter a valid email address." 
  });

  if (validator.isEmpty(req.body.password))
    validationErrors.push({ 
    msg: "Password cannot be blank." 
  });

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

exports.emailLoginPage = (req, res) => {
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
    res.render("emailLogin")
  }
}

exports.emailLoginCheck = (req, res) => {
  res.render("emailLoginCheck");
}

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
    phoneNumber: "",
    txtOk: true,
    address1: "",
    address2: "",
    city: "",
    province: "",
    country: "",
    postCode: "",
    image: `https://robohash.org/${randomAvatar}?set=set4`,
    cloudinaryId: "",
    bio: "",
    iCanHelpWith: "",
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

async function getRandomName() {
  try {
    const data = await fs.readFile('./src/data/names.txt', { encoding: 'utf8' });
    return data.split('\n')[ Math.floor( Math.random() * 21985 ) ].replace('\r', '')
  } catch (err) {
    console.log(err);
  };
};

exports.getRandomName = getRandomName

// Create a user from dashboard
exports.createUser = async (req, res, next) => {

  const validationErrors = [];
  // const genPass = generator.generate({length: 12, numbers: true, symbols: true})
  const rand = generator.generate({length: 16})

  // is user in db ?
  const existingUser = await User.findOne({email: req.body.email })
  if(existingUser) {
    // is user already a member of the church ?
    if(existingUser.church.includes(req.user.id)) {
      req.flash("errors", { 
        type: 'emailExists',
        msg: 'User exists',
        id: existingUser.id
      });
      return res.redirect("/dashboard")
    }else {
      // add church id to users churches array
      existingUser.church.push(req.user.id)
      const userSaved = await existingUser.save();
      if (userSaved) {
        return res.redirect("/dashboard")
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account was not created",
        });
        return res.redirect("/dashboard")
      }
    }
  } else {
    // create user and add church id to users churches array 
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ 
        type: 'validEmail',
        msg: "Please enter a valid email address." 
    });

    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/dashboard");
    }

    // sanitize email
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    let user 
    if (req.user.isAdmin && req.user.email === 'demo@user.com') {

      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: rand.toString(),
        isAdmin: false,
        church: req.user.church,
        phoneNumber: "414 555 1515",
        txtOk: true,
        address1: "123 Any Street",
        address2: "Rue 22",
        city: "Anytown",
        province: "CO",
        country: "USA",
        postCode: "12345",
        image: `https://robohash.org/${rand}`,
        cloudinaryId: "",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic temporibus sunt perferendis quidem necessitatibus voluptatibus minima ipsa iure consectetur earum mollitia obcaecati maiores harum, molestiae alias maxime fugit, deserunt excepturi recusandae ex asperiores quod. Esse.",
        iCanHelpWith: ['Cooking', 'Cleaning', 'Yard work'],
        members: [],
        numOfSessions: 0,
        numOfEmailsSent: 0,
        googleId: "",
        twitterId: "",
        magicLinkHash: "",
      });

    } else {

      user = new User({
        name: req.body.name || 'user' + rand.toString(),
        email: req.body.email,
        password: "asdfasdf",
        isAdmin: false,
        church: req.user.church,
        phoneNumber: "",
        txtOk: true,
        address1: "",
        address2: "",
        city: "",
        province: "",
        country: "",
        postCode: "",
        image: `https://robohash.org/${rand}`,
        cloudinaryId: "",
        bio: "",
        iCanHelpWith: [],
        members: [],
        numOfSessions: 0,
        numOfEmailsSent: 0,
        googleId: "",
        twitterId: "",
        magicLinkHash: "",
      });

    }
    
    const isSaved =  await user.save()

    if (isSaved) {
      console.log(isSaved)
      console.log('new is saved into database, send email')
      req.body.email = isSaved.email

      req.flash("success", { 
        type: 'userCreated',
        msg: 'User created',
        id: isSaved.id
      });
      return res.redirect("/dashboard")
    }else {
      req.flash("errors", {
        msg: "Account was not created",
      });
      return res.redirect("/dashboard")
    }
  }
};