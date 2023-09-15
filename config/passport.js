const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const mongoose = require("mongoose");
const User = require("../models/User");
const generator = require('generate-password')

module.exports = function (passport) {

  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
  }, async (request, accessToken, refreshToken, profile, done) => {

    const rand = generator.generate({length: 16})

    const newUser = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: "asdfasdf",
      isAdmin: false,
      church: [],
      phoneNumber: "",
      txtOk: true,
      address1: "",
      address2: "",
      city: "",
      province: "",
      country: "",
      postCode: "",
      image: profile.photos[0].value || `https://robohash.org/${rand}`,
      cloudinaryId: "",
      bio: "",
      iCanHelpWith: [],
      members: [],
      numOfSessions: 0,
      numOfEmailsSent: 0,
      googleId: profile.id,
      twitterId: "",
      magicLinkHash: "",
    });
    
    try {
      let user = await User.findOne({ email: profile.emails[0].value })
      if(user) {
        done(null, user)
      } else {
        user = await User.create(newUser)
        done(null, user)
      }
    } catch (error) {
      console.log(error)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });







};


