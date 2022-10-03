const express = require("express");
const router = express.Router();
const updateController = require("../controllers/update");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Get Update Password Page
router.get("/", ensureAuth, updateController.updatePage);

// Update Password
router.put("/password/", ensureAuth, updateController.updatePassword);


module.exports = router;
