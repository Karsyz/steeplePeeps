const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const dashboardController = require("../controllers/dashboard");
const directoryController = require("../controllers/directory");
const emailController = require("../controllers/email");
const { ensureAuth, ensureGuest, ensureAdmin } = require("../middleware/auth");

// Index
router.get("/", homeController.getIndex);

// Get Admin Dashboard
router.get("/dashboard", ensureAuth, dashboardController.getDashboard);

// Get Directory
router.get("/directory", ensureAuth, directoryController.getDirectory);

// Login Page
router.get("/login", authController.getLogin);

// Login Submit
router.post("/login", authController.postLogin);

// @desc    EmailLogin Page
// @route   GET /emailLogin
router.get("/emailLogin", authController.emailLoginPage)

// @desc    EmailLogin Submit
// @route   POST emailLogin
router.post('/emailLogin', passport.authenticate('magiclink', {
  action: 'requestToken',
  failureRedirect: '/login',
  failureMessage: true
}), emailController.emailLoginSubmit);

// @desc    EmailLogin Check Email Page
// @route   GET /emailLoginCheck
router.get("/emailLoginCheck", authController.emailLoginCheck)

// Logout
router.get("/logout", authController.logout);

// Build a Church Page
router.get("/buildAChurch", authController.buildAChurchForm);

// Build a Church Submit Form
router.post("/buildAChurch/createUser", authController.buildAChurch);

// Create User
router.post("/createUser", ensureAdmin, authController.createUser, passport.authenticate('magiclink', {
    action: 'requestToken',
    failureRedirect: '/login',
    failureMessage: true
  }), emailController.emailLoginSubmit
);

// Error Page
router.get("/errorPage", homeController.errorPage);

// Demo Login
router.get("/demo", homeController.demo);


module.exports = router;
