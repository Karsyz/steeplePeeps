const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const dashboardController = require("../controllers/dashboard");
const directoryController = require("../controllers/directory");
const emailController = require("../controllers/email");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Index
router.get("/", homeController.getIndex);

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

// Build a Church Page
router.get("/buildAChurch", authController.buildAChurch);

// Create User / Build a Church Submit Form
router.post("/createUser", authController.createUser);

// Send email to new user
router.post("/sendEmail/:id", emailController.sendEmail);

module.exports = router;
