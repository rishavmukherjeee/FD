const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

router.get("/getPost", postController.getAllPost);
router.get("/getPostByEmail", postController.getLatestPostByEmail);
router.post("/createPost", postController.createPost);
router.patch("/updatePost", postController.updatePost);
router.put("/comments", postController.addComments);

module.exports = router;
