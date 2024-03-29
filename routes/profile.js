const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profiles");
const { ensureAuth, ensureGuest, ensureAdmin } = require("../middleware/auth");

// Get User Profile
router.get("/user", ensureAuth, profileController.getUserProfile);

// Get User Profile With ID
router.get("/user/:id", ensureAdmin, profileController.getUserProfileId);

// Send user profile object to front end for profile cards
router.get("/userProfile/:id", ensureAuth, profileController.sendUserProfile);

// Search for userect to front end for profile cards
router.get("/userProfile/search/:searchTerm", ensureAuth, profileController.searchUser);

// Remove church id from user profile
router.put("/removeProfile/:id", profileController.removeChruchIdFromUser);

// Delete Profile
router.delete("/deleteProfile/:id", profileController.deleteProfile);

module.exports = router;
