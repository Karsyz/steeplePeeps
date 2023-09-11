const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const dashboardController = require("../controllers/dashboard");
const directoryController = require("../controllers/directory");
const emailController = require("../controllers/email");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}) )


// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get("/google/callback", passport.authenticate('google', {failureRedirect: "/login"}), authController.googleLoginCallback)




// // Login with Twitter 
// router.post("/twitter", authController.twitterLogin)





module.exports = router;
