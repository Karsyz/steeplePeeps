const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profilesController = require("../controllers/profiles");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Profiles Routes
router.get("/:id", ensureAuth, profilesController.getChurchProfile);

module.exports = router;
