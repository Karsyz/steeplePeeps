const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const profilesController = require("../controllers/profiles");
const dashboardController = require("../controllers/dashboard");
const directoryController = require("../controllers/directory");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Index
router.get("/", homeController.getIndex);

// Get Church Profile
router.get("/churchProfile", ensureAuth, profilesController.getChurchProfile);

// Get User Profile
router.get("/userProfile", ensureAuth, profilesController.getUserProfile);

// Get Admin Dashboard
router.get("/dashboard", ensureAuth, dashboardController.getDashboard);

// Get Directory
router.get("/directory", ensureAuth, directoryController.getDirectory);

// Login
router.get("/login", authController.getLogin);

// Login Submit
router.post("/login", authController.postLogin);

// Logout
router.get("/logout", authController.logout);

// Build a Church
router.get("/buildAChurch", authController.getSignup);

// Build a Church Submit
router.post("/buildAChurch", authController.postSignup);

module.exports = router;
