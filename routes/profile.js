const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profiles");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Get User Profile
router.get("/user", ensureAuth, profileController.getUserProfile);

// Get User Profile With ID
router.get("/user/:id", ensureAuth, profileController.getUserProfileId);

// Delete Profile
router.delete("/deleteProfile/:id", profileController.deleteProfile);

module.exports = router;
