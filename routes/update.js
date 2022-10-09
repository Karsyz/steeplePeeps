const express = require("express");
const router = express.Router();
const updateController = require("../controllers/update");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Get Update Password Page
router.get("/", ensureAuth, updateController.updatePage);

// Update Password
router.put("/password/", ensureAuth, updateController.updatePassword);

// Update User Profile
router.put("/userProfile/:id", ensureAuth, updateController.putUpdateUserProfile);

module.exports = router;
