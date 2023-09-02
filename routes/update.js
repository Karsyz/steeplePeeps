const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const updateController = require("../controllers/update");
const { ensureAuth, ensureGuest, ensureAdmin } = require("../middleware/auth");

// Get Update Password Page
router.get("/", ensureAuth, updateController.updatePage);

// Admin with user id
router.get("/:id", ensureAdmin, updateController.updatePage);

// Update Password
router.put("/password", ensureAuth, updateController.updatePassword);

// Update Password as Admin
router.put("/password/:id", ensureAdmin, updateController.updatePassword);

// Update User Profile
router.put("/userProfile/:id", ensureAuth, updateController.putUpdateUserProfile);

// Update User Profile Picture
router.post("/profilePicture/:id",  upload.single("file"), updateController.updateProfilePicture);

module.exports = router;
