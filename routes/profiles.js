const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profilesController = require("../controllers/profiles");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, profilesController.getChurchProfile);

// router.post("/createPost", upload.single("file"), postsController.createPost);

// router.put("/likePost/:id", postsController.likePost);

// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
